import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, NavItem } from './NavItems';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userAccess: string;
}

interface GroupedNavItems {
  [key: string]: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  userAccess,
}) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const filteredNavItems = navItems.filter(
    (item) =>
      item.access.includes('*') || item.access.includes(userAccess as never),
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const groupedNavItems: GroupedNavItems = filteredNavItems.reduce(
    (acc, item) => {
      const group = item.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    },
    {} as GroupedNavItems,
  );

  const toggleDropdown = (group: string) => {
    setOpenDropdown(openDropdown === group ? null : group);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-[50%]"
          onClick={toggleSidebar}
        />
      )}
      <motion.aside
        initial={isMobile ? { x: '-100%' } : false}
        animate={isMobile ? { x: isOpen ? 0 : '-100%' } : {}}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-black lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <Link to="/admin" className="text-2xl font-bold text-white">
              Admin Panel
            </Link>
            {isMobile && (
              <button onClick={toggleSidebar} className="text-white">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <nav className="mt-4 grow">
            <ul>
              {Object.entries(groupedNavItems).map(([group, items]) => (
                <li key={group} className="mb-2">
                  <button
                    onClick={() => toggleDropdown(group)}
                    className="flex w-full items-center justify-between px-6 py-2 text-white transition-colors duration-200 hover:bg-[#1c5a7a]"
                  >
                    <span>{group}</span>
                    <motion.svg
                      animate={{ rotate: openDropdown === group ? 180 : 0 }}
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === group && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 overflow-hidden"
                      >
                        {items.map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className={`flex items-center px-6 py-2 text-sm text-white transition-colors duration-200 hover:bg-[#1c5a7a] ${
                                location.pathname === item.href
                                  ? 'bg-[#1c5a7a]'
                                  : ''
                              }`}
                              onClick={isMobile ? toggleSidebar : undefined}
                            >
                              {item.icon}
                              <span className="ml-2">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
