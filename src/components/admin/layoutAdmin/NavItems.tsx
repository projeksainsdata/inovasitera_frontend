import React from 'react';
import { IconDashboard, IconUsers, IconCategory, IconBox, IconPlus, IconHeartFilled, IconFileText } from '@tabler/icons-react';

export interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
  group: string;
  access: string[];
}

export const navItems: NavItem[] = [
  {
    href: '/admin',
    label: 'Dashboard Inovasi',
    icon: <IconDashboard size={24} />,  // Use Tabler Icon here
    group: 'Analytics',
    access: ['*'],
  },
  {
    href: '/admin/user-overview',
    label: 'Dashboard Pengguna',
    icon: <IconDashboard size={24} />,  // Use Tabler Icon here
    group: 'Analytics',
    access: ['*'],
  },
  {
    href: '/admin/user',
    label: 'Daftar Pengguna',
    icon: <IconUsers size={24} />,  // Use Tabler Icon here
    group: 'Pengguna',
    access: ['*'],
  },
  {
    href: '/admin/kategori',
    label: 'Daftar Kategori',
    icon: <IconCategory size={24} />,  // Use Tabler Icon here
    group: 'Kategori Postingan',
    access: ['*'],
  },
  {
    href: '/admin/manajemen-inovasi',
    label: 'Produk Inovasi',
    icon: <IconBox size={24} />,  // Use Tabler Icon here
    group: 'Manajemen Inovasi',
    access: ['*'],
  },
  {
    href: '/admin/tambah-inovasi',
    label: 'Tambah Inovasi',
    icon: <IconPlus size={20} />,
    group: 'Manajemen Inovasi',
    access: ['*'],
  },

  {
    href: '/admin/my-inovasi',
    label: 'Inovasi Saya',
    icon: <IconFileText size={20} />,
    group: 'Manajemen Inovasi',
    access: ['*'],
  },

  {
    href: '/admin/wishlist-inovasi',
    label: 'Wishlist Inovasi',
    icon: <IconHeartFilled size={20} />,
    group: 'Manajemen Inovasi',
    access: ['*'],
  },

];
