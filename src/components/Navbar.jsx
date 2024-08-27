import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase'; // Adjust the import according to your setup

function MyNavbar() {
  const { isLoggedIn, logout, user } = useFirebase(); // Ensure user is included
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Navbar
      expand="lg"
      style={{
        background: 'linear-gradient(90deg, #ff6f61, #ff9671, #ffc75f)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background 0.5s ease-in-out',
        padding: '0.5rem 1rem',
      }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#fff',
            transition: 'color 0.3s ease-in-out',
          }}
        >
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: '#fff',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease-in-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff6f61';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#fff';
              }}
            >
              Home
              <span
                style={{
                  display: 'block',
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#ff6f61',
                  transition: 'width 0.3s ease-in-out',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                }}
              />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/book/list"
              style={{
                color: '#fff',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease-in-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff6f61';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#fff';
              }}
            >
              Add Listing
              <span
                style={{
                  display: 'block',
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#ff6f61',
                  transition: 'width 0.3s ease-in-out',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                }}
              />
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/book/orders"
              style={{
                color: '#fff',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease-in-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff6f61';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#fff';
              }}
            >
              Orders
              <span
                style={{
                  display: 'block',
                  width: '0%',
                  height: '2px',
                  backgroundColor: '#ff6f61',
                  transition: 'width 0.3s ease-in-out',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                }}
              />
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'color 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                >
                  {user.username} {/* Display the username */}
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'color 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ff6f61';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#fff';
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'color 0.3s ease-in-out',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ff6f61';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#fff';
                  }}
                >
                  Login
                  <span
                    style={{
                      display: 'block',
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#ff6f61',
                      transition: 'width 0.3s ease-in-out',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register" // Add a link to the registration page
                  style={{
                    color: '#fff',
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    transition: 'color 0.3s ease-in-out',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ff6f61';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#fff';
                  }}
                >
                  Register
                  <span
                    style={{
                      display: 'block',
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#ff6f61',
                      transition: 'width 0.3s ease-in-out',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                    }}
                  />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
