import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";
import MyCard from '../components/Card'; // Ensure the correct import path

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    firebase.ListAllBooks() // Ensure this function name matches the one in Firebase context
      .then((data) => {
        console.log("Fetched books:", data); // Debugging statement
        setBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books."); // Handle errors
      });
  }, [firebase]);

  return (
    <div className="container mt-5">
      <h1>All The Listings</h1>
      {error && <p>{error}</p>} {/* Display error if any */}
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <div key={book.isbn} className="m-2"> {/* Use ISBN as key */}
            <MyCard 
              isbn={book.isbn} // Pass the correct ISBN
              name={book.name}
              coverURL={book.coverURL}
              displayName={book.ownerName}
              price={book.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
