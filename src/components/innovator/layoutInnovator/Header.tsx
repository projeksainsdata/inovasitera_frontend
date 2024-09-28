import React from 'react';
import { useLocation } from 'react-router-dom';
import { navItems } from './NavItems';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={toggleSidebar} className="text-black lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-black">
          {navItems.find((item) => item.href === location.pathname)?.label || 'Dashboard'}
        </h1>
        <div className="flex items-center"></div>
      </div>
    </header>
  );
};

export default Header;
