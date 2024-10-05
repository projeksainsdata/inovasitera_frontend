import React from 'react';
import {
  IconDashboard,
  IconFileText,
  IconUsers,
  IconFolders,
  IconPlus,
  IconHeartFilled
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
    href: '/innovator/profil',
    label: 'Edit Profil',
    icon: <IconDashboard size={20} />,
    group: 'Profil',
    access: ['innovator'],
  },
  {
    href: '/member/profil',
    label: 'Edit Profil',
    icon: <IconDashboard size={20} />,
    group: 'Profil',
    access: ['member'],
  },
  {
    href: '/innovator/list-inovasi',
    label: 'Inovasi Saya',
    icon: <IconFileText size={20} />,
    group: 'Inovasi',
    access: ['innovator'],
  },
  {
    href: '/innovator/wishlist-inovasi',
    label: 'Wishlist Inovasi',
    icon: <IconHeartFilled size={20} />,
    group: 'Inovasi',
    access: ['innovator'],
  },
  {
    href: '/member/wishlist-inovasi',
    label: 'Wishlist Inovasi',
    icon: <IconHeartFilled size={20} />,
    group: 'Inovasi',
    access: ['member'],
  },
  {
    href: '/innovator/tambah-inovasi',
    label: 'Tambah Inovasi',
    icon: <IconPlus size={20} />,
    group: 'Inovasi',
    access: ['innovator'],
  },
];
