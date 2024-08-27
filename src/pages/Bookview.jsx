import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Bookview() {
  const { isbn } = useParams(); // Get the ISBN from URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { getBookByISBN, placeOrder } = useFirebase(); // Use Firebase hook to get the functions
  const [quant, setQuant] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Fetching book with ISBN:", isbn); // Debugging log
        const books = await getBookByISBN(isbn);
        if (books.length > 0) {
          setBook(books[0]); // Assuming ISBN is unique or handling multiple books with the same ISBN
        } else {
          setError("Book not found.");
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        setError("Failed to fetch book.");
      }
    };

    fetchBook();
  }, [isbn, getBookByISBN]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure minimum quantity is 1
    setQuant(value);
  };

  const handlePlaceOrder = () => {
    placeOrder(isbn, quant)
      .then(() => {
        alert("Order placed successfully");
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        alert("Failed to place order.");
      });
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Bootstrap text-danger class for error
  }

  if (!book) {
    return <p className="text-info">Loading...</p>; // Bootstrap text-info class for loading
  }

  const jiggleAnimation = {
    animation: 'jiggle 1s ease infinite',
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-light rounded" style={{ maxWidth: '800px', margin: 'auto' }}>
        <div className="card-body">
          <h1 className="card-title mb-4" style={jiggleAnimation}>{book.name}</h1>
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/bookify-44b26.appspot.com/o/${encodeURIComponent(book.coverURL)}?alt=media`}
            alt={book.name}
            className="img-fluid rounded mb-4"
            style={{ width: '100%', height: 'auto', ...jiggleAnimation }}
          />
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <p><strong>Owner:</strong> {book.ownerName}</p>
          <p><strong>Owner Email:</strong> {book.ownerEmail}</p>
          <p><strong>Created At:</strong> {new Date(book.createdAt.seconds * 1000).toLocaleDateString()}</p>
          <Form>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter the quantity" 
                className="form-control"
                value={quant}
                onChange={handleQuantityChange}
                min="1" // Ensure minimum quantity is 1
              />
            </Form.Group>
          </Form>
          <Button variant="success" onClick={handlePlaceOrder}>Buy Now</Button>
        </div>
      </div>
      <style>
        {`
          @keyframes jiggle {
            0% { transform: translateX(0); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Bookview;
