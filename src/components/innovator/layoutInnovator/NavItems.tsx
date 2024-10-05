import React from 'react';
import {
  IconDashboard,
  IconFileText,
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
    access: ['*'],
  },
  {
    href: '/innovator/list-inovasi',
    label: 'Inovasi Saya',
    icon: <IconFileText size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
  {
    href: '/innovator/wishlist-inovasi',
    label: 'Wishlist Inovasi',
    icon: <IconHeartFilled size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
  {
    href: '/innovator/tambah-inovasi',
    label: 'Tambah Inovasi',
    icon: <IconPlus size={20} />,
    group: 'Inovasi',
    access: ['*'],
  },
];
