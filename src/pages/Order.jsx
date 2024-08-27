import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import MyCard from "../components/Card";

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!firebase.isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await firebase.fetchMyBooks(); // Ensure this function matches your implementation
        if (response && Array.isArray(response)) {
          setBooks(response); // Adjust based on your actual response format
        } else {
          console.error("Unexpected response format:", response);
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [firebase]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <MyCard
            link={`/books/orders/${book.isbn}`} // Use ISBN instead of ID
            key={book.isbn} // Use ISBN instead of ID
            isbn={book.isbn} // Pass ISBN to MyCard
            {...book} // Pass other properties directly if they match
          />
        ))
      )}
    </div>
  );
};

export default OrdersPage;
