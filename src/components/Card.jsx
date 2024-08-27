import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

// Default parameters in function signature
function MyCard({ name, coverURL = '/default-cover.png', displayName, price, isbn }) {
  console.log('ISBN:', isbn); 

  // Construct the URL for the cover image
  const imageUrl = coverURL 
    ? `https://firebasestorage.googleapis.com/v0/b/bookify-44b26.appspot.com/o/${encodeURIComponent(coverURL)}?alt=media` 
    : '/default-cover.png';

  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          The title of the book is {name} and the book is sold by {displayName}.
          This book costs ${price}.
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/book/view/${isbn}`)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

// PropTypes validation
MyCard.propTypes = {
  name: PropTypes.string.isRequired,
  coverURL: PropTypes.string,
  displayName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isbn: PropTypes.string.isRequired,
};

export default MyCard;
