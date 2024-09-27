import React from 'react';
import {
  IconDashboard,
  IconFileText,
  IconUsers,
  IconFolders,
  IconPlus,
} from '@tabler/icons-react';

export interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
  group: string;
  access: string[];
}

export const navItems: NavItem[] = [
  {
    href: '/dashboard/profil',
    label: 'Edit Profil',
    icon: <IconDashboard size={20} />,
    group: 'Profil',
    access: ['*'],
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <IconDashboard size={20} />,
    group: 'Analytics',
    access: ['*'],
  },
  {
    href: '/dashboard/inovasi-saya',
    label: 'Inovasi Saya',
    icon: <IconFileText size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
  {
    href: '/dashboard/profil#wishlist',
    label: 'Wishlist Inovasi',
    icon: <IconFileText size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
  {
    href: '/dashboard/tambah-inovasi',
    label: 'Tambah Inovasi',
    icon: <IconPlus size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
];
