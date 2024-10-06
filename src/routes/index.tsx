
// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '@/App';
import '@/index.css';
import '@/App.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Tentang from '@/pages/Tentang';
import KategoriesAdmin from '@/pages/admin/categories';
import ListInovasi from '@/pages/ListInovasi';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import DetailInovasi from '@/pages/DetailInovasi';
import ForgotPassword from '@/pages/ForgotPassword';
import { PublicRoute } from '@/routes/PublicRoute';
import { PrivateRoute } from '@/routes/PrivateRoute';
// import InovationAdmin from '@/pages/admin/inovations';
import UserAdmin from '@/pages/admin/user';
import ManajemenInovasiAdmin from '@/pages/admin/manajemenInovasi';
// import InovationAdminDetail from '@/pages/admin/manajemenDetailInovasi';
import InnovatorListInovasi from '@/pages/innovator/innovations/ListInovasi';
import InnovatorTambahInovasi from '@/pages/innovator/innovations/TambahInovasi';
import InnovatorWishlistInovasi from '@/pages/innovator/wishlist/WishlistInovasi';
import Profil from '@/pages/Profile';
import ResetPassword from '@/pages/ResetPassword';
import UpdateInovasi from '@/pages/innovator/innovations/UpdateInovasi';
import NotFoundPage from '@/components/NotFound';
import ROLE, { ROLE_PERMISSION } from '@/lib/constants/role.contants';
import TambahInovasi from '@/pages/admin/manajemenInovasi/TambahInovasi';
import UserOverviewPage from '@/pages/admin/dashboard/UserOverview';
import InnovationOverviewPage from '@/pages/admin/dashboard/InnovatorOverview';
import MyListInovasi from '@/components/admin/ManajemenProduk/MyListInovasi';
import AdminDetailInovasi from '@/components/admin/ManajemenProduk/DetailInovasi';
import AdminWhitelistInovasi from '@/components/admin/ManajemenProduk/WhiteListAdmin';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
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

                    <Route path="/" element={
                        <App />
                    } />
                    <Route path="/tentang" element={<Tentang />} />
                    <Route path="/admin/" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <InnovationOverviewPage />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/user-overview" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <UserOverviewPage />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/kategori" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <KategoriesAdmin />
                        </PrivateRoute>
                    } />
                    {/* <Route path="/admin/inovation" element={<PrivateRoute role={['admin']}><InovationAdmin /></PrivateRoute>} /> */}
                    <Route path="/admin/user" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <UserAdmin />
                        </PrivateRoute>} />
                    <Route path="/admin/manajemen-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <ManajemenInovasiAdmin />
                        </PrivateRoute>}
                    />
                    <Route path="/admin/tambah-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <TambahInovasi />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/my-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <MyListInovasi />
                        </PrivateRoute>
                    } />

                    <Route path="/admin/detail-inovasi/:id" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.ADMIN]}>
                            <AdminDetailInovasi />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/wishlist-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.INOVATOR]}>
                            <AdminWhitelistInovasi />
                        </PrivateRoute>
                    } />

                    <Route path="/inovasi" element={<ListInovasi />} />
                    <Route path="/inovasi/:id" element={<DetailInovasi />} />

                    <Route path="/innovator/profil" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.MEMBER]}>
                            <Profil />
                        </PrivateRoute>
                    } />
                    <Route path="/innovator/list-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.INOVATOR]}>
                            <InnovatorListInovasi />
                        </PrivateRoute>
                    } />
                    <Route path="/innovator/tambah-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.INOVATOR]}>
                            <InnovatorTambahInovasi />
                        </PrivateRoute>
                    } />
                    <Route path="/innovator/detail-inovasi/:id" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.INOVATOR]}>
                            <UpdateInovasi />
                        </PrivateRoute>
                    } />
                    <Route path="/innovator/wishlist-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.INOVATOR]}>
                            <InnovatorWishlistInovasi />
                        </PrivateRoute>
                    } />

                    <Route path="/member/profil" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.MEMBER]}>
                            <Profil />
                        </PrivateRoute>
                    } />

                    <Route path="/member/wishlist-inovasi" element={
                        <PrivateRoute role={ROLE_PERMISSION[ROLE.MEMBER]}>
                            <InnovatorWishlistInovasi />
                        </PrivateRoute>
                    } />


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


                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </AuthProvider >
        </Router >
    );
};

export default AppRoutes;