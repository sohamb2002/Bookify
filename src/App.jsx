import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import MyNavbar from './components/Navbar';
import List from './pages/List';
import Home from './pages/Home';
import Bookview from './pages/Bookview'; // Ensure this is correct
import Order from './pages/Order';

function App() {
  return (
    <>
      <div>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/list" element={<List />} />
          <Route path="/register" element={<Register />} />
         <Route path="/book/view/:isbn" element={<Bookview />} /> {/* Ensure the component name matches */}
          <Route path="/login" element={<Login />} />
          <Route path='/book/orders' element={<Order/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
