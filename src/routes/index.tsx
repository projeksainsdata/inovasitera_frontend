
// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '@/App';
import '@/index.css';
import '@/App.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Tentang from '@/pages/Tentang';
import AdminIndex from '@/pages/admin/index';
import KategoriesAdmin from '@/pages/admin/categories';
import ListInovasi from '@/pages/ListInovasi';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DetailInovasi from '@/pages/DetailInovasi';
import ForgotPassword from '@/pages/ForgotPassword';
import { PublicRoute } from '@/routes/PublicRoute';
import { PrivateRoute } from '@/routes/PrivateRoute';
import InovationAdmin from '@/pages/admin/inovations';
import UserAdmin from '@/pages/admin/user';
import ManajemenInovasiAdmin from '@/pages/admin/manajemenInovasi';
import InovationAdminDetail from '@/pages/admin/manajemenDetailInovasi';
import ProfilePage from '@/pages/ProfilePage';
import InnovatorListInovasi from '@/pages/innovator/innovations/ListInovasi';
import InnovatorTambahInovasi from '@/pages/innovator/innovations/TambahInovasi';
import InnovatorWishlistInovasi from '@/pages/innovator/wishlist/WishlistInovasi';
import Profil from '@/pages/Profile';
import ResetPassword from '@/pages/ResetPassword';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <App />
                    } />
                    <Route path="/tentang" element={<Tentang />} />
                    <Route path="/admin/" element={
                        <PrivateRoute role={['admin']}>
                            <AdminIndex />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/kategori" element={
                        <PrivateRoute role={['admin']}>
                            <KategoriesAdmin />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/inovation" element={<PrivateRoute role={['admin']}><InovationAdmin /></PrivateRoute>} />
                    <Route path="/admin/user" element={<PrivateRoute role={['admin']}>
                        <UserAdmin /></PrivateRoute>} />
                    <Route path="/admin/manajemeninovasi" element={<PrivateRoute role={['admin']}>
                        <ManajemenInovasiAdmin /></PrivateRoute>}
                    />
                    <Route path="/admin/detailinovasi" element={
                        <PrivateRoute role={['admin']}>
                            <InovationAdminDetail />
                        </PrivateRoute>
                    } />
                    <Route path="/inovasi" element={<ListInovasi />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />
                    <Route path="/inovasi/:id" element={<DetailInovasi />} />
                    <Route path="/innovator/profil" element={<Profil />} />
                    <Route path="/innovator/list-inovasi" element={<InnovatorListInovasi />} />
                    <Route path="/innovator/tambah-inovasi" element={<InnovatorTambahInovasi />} />
                    <Route path="/innovator/wishlist-inovasi" element={<InnovatorWishlistInovasi />} />
                    <Route path="/forgot-password" element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    } />
                    <Route path="/reset-password" element={
                        <PublicRoute>
                            <ResetPassword />
                        </PublicRoute>
                    } />
                </Routes>
            </AuthProvider >
        </Router >
    );
};

export default AppRoutes;