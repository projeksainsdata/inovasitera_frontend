import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import About from './pages/about';
import React from 'react';
import App from './App';
import './index.css'; 
import './App.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
