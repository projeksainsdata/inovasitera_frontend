import React from 'react';
import { IconDashboard, IconUsers, IconCategory, IconBox,IconPlus } from '@tabler/icons-react';

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
    label: 'Dashboard',
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
    href: '/admin/manajemeninovasi',
    label: 'Produk Inovasi',
    icon: <IconBox size={24} />,  // Use Tabler Icon here
    group: 'Manajemen Inovasi',
    access: ['*'],
  },
  {
    href: '/admin/tambahinovasi',
    label: 'Tambah Inovasi',
    icon: <IconPlus size={20} />,
    group: 'Manajemen Inovasi',
    access: ['*'],
  },
];
