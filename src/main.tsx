import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListInovasi from './pages/ListInovasi';
import Login from './pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import Tentang from './pages/Tentang';
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
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/inovasi" element={<ListInovasi />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
