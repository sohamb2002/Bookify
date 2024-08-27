import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useFirebase } from '../context/firebase';

function List() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverpic, setCoverpic] = useState("");
const firebase=useFirebase();



  const handleSubmit = async(e) => {
    e.preventDefault();
   await firebase.handleCreateNewListing(name,isbnNumber,price,coverpic);

   
  };

  return (
    <div className="container register-container">
      <div className="register-card">
        <h2 className="register-title">Please fill out the listing details</h2>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book name here"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIsbnNumber">
            <Form.Label>ISBN Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ISBN number"
              className="form-control"
              value={isbnNumber}
              onChange={(e) => setIsbnNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCoverPic">
    <Form.Label>Cover Picture</Form.Label>
    <Form.Control
        type="file"
        placeholder="Upload the file Image"
        className="form-control"
        onChange={(e) => setCoverpic(e.target.files[0])}
    />
</Form.Group>


          <Button variant="primary" type="submit" className="submit-button">
            Create Listing
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default List;
