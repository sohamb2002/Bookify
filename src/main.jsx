import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Your custom styles
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import { FirebaseProvider } from './context/firebase.jsx';
import {BrowserRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
    </BrowserRouter>
  </StrictMode>,
);
