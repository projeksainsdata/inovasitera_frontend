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
    label: 'Innovation Dashboard',
    icon: <IconDashboard size={24} />,  // Use Tabler Icon here
    group: 'Analytics',
    access: ['*'],
  },
  {
    href: '/admin/user-overview',
    label: 'User Dashboard',
    icon: <IconDashboard size={24} />,  // Use Tabler Icon here
    group: 'Analytics',
    access: ['*'],
  },
  {
    href: '/admin/user',
    label: 'Users',
    icon: <IconUsers size={24} />,  // Use Tabler Icon here
    group: 'Users',
    access: ['*'],
  },
  {
    href: '/admin/kategori',
    label: 'Categories',
    icon: <IconCategory size={24} />,  // Use Tabler Icon here
    group: 'Kategori',
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
