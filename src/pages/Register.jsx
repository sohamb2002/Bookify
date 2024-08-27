import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import './Register.css'; // Import custom CSS for styling
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      console.log("Form submitted with:", email, password);
      await firebase.signUp(email, password);
      
      // After successful sign up, navigate to the listing page
      navigate("/listings");
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error if needed, e.g., display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase.isLoggedIn, navigate]);

  return (
    <div className="container register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="submit-button"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
