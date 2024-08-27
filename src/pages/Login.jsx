import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await firebase.login(email, password);
      // Redirect to the home page only if login is successful
      navigate("/");
    } catch (err) {
      console.error("Login error:", err); // Log error for debugging

      // Check the error code to set a specific error message
      if (err.code === 'auth/invalid-email') {
        setError("The email address is invalid.");
      } else if (err.code === 'auth/user-not-found') {
        setError("No user found with this email.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <div className="register-card" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', backgroundColor: '#fff' }}>
        <h2 className="register-title" style={{ marginBottom: '20px' }}>Login to your Account</h2>
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error}
          </div>
        )}
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button" style={{ width: '100%' }}>
            Login
          </Button>
          <h1 className='mt-5 mb-5'>OR</h1>
          <Button className='bg-red-800' onClick={firebase.googleLogin} style={{ width: '100%' }}>
            Sign In with Google
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
