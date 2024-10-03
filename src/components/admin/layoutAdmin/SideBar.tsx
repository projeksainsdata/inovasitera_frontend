import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems, NavItem } from './NavItems';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "@/assets/Logo1.png"
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import AuthApiService from '@/services/apiServices/auth.api.service';
import { isAxiosError } from 'axios';

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
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthApiService.logout();
      auth.logout();
      toast({
        title: 'Success',
        description: 'Logout successfully',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      navigate('/');
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: 'Error',
          description: error.response?.data.message || 'Failed to logout',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return
      }
      toast({
        title: 'Error',
        description: 'Failed to logout',
        status: 'error',
        duration: 5000,
        isClosable: true
      });

    }
  };

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
        className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-orange-100 lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-2xl font-bold text-black">
              <img src={Logo} className='w-32' />
            </Link>
            {isMobile && (
              <button onClick={toggleSidebar} className="text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
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
                    className="font-bold flex w-full items-center justify-between px-6 py-2 text-black transition-colors duration-200 hover:bg-blue-700 hover:text-white"
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
                              className={`flex items-center px-6 py-2 text-sm text-black transition-colors duration-200 hover:bg-orange-300 ${location.pathname === item.href
                                ? 'bg-orange-300'
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
          <button onClick={handleLogout} className='bg-red-600 px-3 py-2 rounded m-5 text-white'>Keluar Sistem</button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
