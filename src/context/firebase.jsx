import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query,where} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { signOut } from 'firebase/auth';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQp8SWJdpi8836e3yHTbRHTynwUz-rMw8",
  authDomain: "bookify-44b26.firebaseapp.com",
  projectId: "bookify-44b26",
  storageBucket: "bookify-44b26.appspot.com",
  messagingSenderId: "381050508508",
  appId: "1:381050508508:web:b00c5699c06532a452d019"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const firestore = getFirestore();
const FirebaseContext = createContext(null);
const provider = new GoogleAuthProvider();
const storage = getStorage();

// Custom hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Provider component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setUser(user);
        console.log('User is signed in:', user);
      } else {
        setUser(null);
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const ListAllBooks = async () => {
    try {
      const booksRef = collection(firestore, 'books');
      const snapshot = await getDocs(booksRef);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error listing books:", error);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    console.log("SignUp function called with:", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
      console.log('User created:', userCredential.user);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const login = async (email, password) => {
    console.log("Login function called with:", email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const googleLogin = () => {
    signInWithPopup(FirebaseAuth, provider)
      .then((result) => {
        console.log('Google sign-in successful:', result.user);
      })
      .catch((error) => {
        console.error('Error during Google sign-in:', error.message);
      });
  };

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    try {
      const imageref = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
      const uploadResult = await uploadBytes(imageref, cover);
      await addDoc(collection(firestore, 'books'), {
        name,
        isbn,
        price,
        coverURL: uploadResult.ref.fullPath,
        createdAt: new Date(),
        ownerId: user.uid,
        ownerName: user.displayName,
        ownerEmail: user.email,
        ownerPhotoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error creating new listing:", error);
      throw error;
    }
  };

  const getBookByISBN = async (isbn) => {
    try {
      const booksRef = collection(firestore, 'books');
      const q = query(booksRef, where('isbn', '==', isbn));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new Error("No such book found!");
      }
  
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching book by ISBN:", error);
      throw error;
    }
  };
  const isLoggedIn = user ? true : false;

  const placeOrder = async (isbn, quantity) => {
    try {
      const ordersRef = collection(firestore, 'books', isbn, 'orders');
      await addDoc(ordersRef, {
        username: user.displayName,
        email: user.email,
        orderDate: new Date(),
        photoURL: user.photoURL,
        userid:user.uid,
        isbn,
        quantity,
      });
      console.log("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

 
const fetchMyBooks = async () => {
  const currentUser = FirebaseAuth.currentUser; // Get the current user from FirebaseAuth

  if (currentUser) {
    const uid = currentUser.uid;
    try {
      // Create a query against the orders collection
      const ordersQuery = query(collection(firestore, 'orders'), where('userId', '==', uid));
      const querySnapshot = await getDocs(ordersQuery);

      // Map through the results
      const orders = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  } else {
    console.error("Error fetching orders: User is not logged in");
    return [];
  }
};

const logout = async () => {
  try {
    await signOut(FirebaseAuth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};
  
  return (
    <FirebaseContext.Provider value={{ signUp, login, googleLogin, isLoggedIn, handleCreateNewListing, ListAllBooks, getBookByISBN,placeOrder,fetchMyBooks,logout,user }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Adding PropTypes for validation
FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
