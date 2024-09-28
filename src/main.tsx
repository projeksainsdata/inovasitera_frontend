import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css'; 
import './App.css';

import ListInovasi from '@/pages/ListInovasi';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Tentang from '@/pages/Tentang';
import DetailInovasi from '@/pages/DetailInovasi';
import KategoriesAdmin from '@/pages/admin/categories';
import Index from '@/pages/admin/index';
import InovationAdmin from '@/pages/admin/inovations';
import ForgotPassword from '@/pages/ForgotPassword';
import InnovatorListInovasi from '@/pages/innovator/innovations/ListInovasi';
import InnovatorTambahInovasi from '@/pages/innovator/innovations/TambahInovasi';
import InnovatorWishlistInovasi from '@/pages/innovator/wishlist/WishlistInovasi';
import Profil from '@/pages/Profile';

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
          <Route path="/inovasi" element={<ListInovasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inovasi/:id" element={<DetailInovasi />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/innovator/profil" element={<Profil/>}/>
          <Route path="/innovator/list-inovasi" element={<InnovatorListInovasi/>}/>
          <Route path="/innovator/tambah-inovasi" element={<InnovatorTambahInovasi/>}/>
          <Route path="/innovator/wishlist-inovasi" element={<InnovatorWishlistInovasi/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
