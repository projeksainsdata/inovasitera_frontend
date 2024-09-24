import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListInovasi from './pages/ListInovasi';
import Login from './pages/Login';
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import Tentang from './pages/Tentang';
import DetailInovasi from './pages/DetailInovasi';
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
          <Route path="/register" element={<Register />} />
          <Route path="/inovasi/:id" element={<DetailInovasi />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
