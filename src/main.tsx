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

import KategoriesAdmin from './pages/admin/categories';
import Index from '@/pages/admin/index';
import InovationAdmin from './pages/admin/inovations';

import ForgotPassword from './pages/ForgotPassword';
import UserAdmin from './pages/admin/user';
import ManajemenInovasiAdmin from './pages/admin/manajemenInovasi';
import InovationAdminDetail from './pages/admin/manajemenDetailInovasi';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/admin/" element={<Index />} />
          <Route path="/admin/kategori" element={<KategoriesAdmin />} />
          <Route path="/admin/inovation" element={<InovationAdmin />} />
          <Route path="/admin/user" element={<UserAdmin />} />
          <Route path="/admin/manajemeninovasi" element={<ManajemenInovasiAdmin />} />
          <Route path="/admin/detailinovasi" element={<InovationAdminDetail />} />
          <Route path="/inovasi" element={<ListInovasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inovasi/:id" element={<DetailInovasi />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
