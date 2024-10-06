import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from "../assets/Logo2.png";
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const getProfilePath = (role) => {
    switch (role) {
      case "innovator":
        return "/innovator/profil";
      case "member":
        return "/member/profil";
      default:
        return "/admin";
    }
  }

  return (
    <>
      <nav className="navbar md:px-[150px] px-6 flex justify-center transition-all duration-300 fixed top-0 left-0 right-0 z-9999 py-3">
        <div className="rounded-full px-4 md:pr-3 md:pl-4 py-2 flex items-center justify-between max-w-7xl w-full transition-all duration-300 bg-white shadow">
          <div className="flex items-center">
            <Link to={'/'}>
              <img src={Logo} alt="Logo" className="h-8 md:h-10" />
            </Link>
          </div>
          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-16 transition-all duration-300 ease-in-out">
            <Link to={"/"}><a className="text-black hover:text-gray-600 transition duration-200">Beranda</a></Link>
            <Link to={"/inovasi"}><a className="text-black hover:text-gray-600 transition duration-200">Semua Inovasi</a></Link>
            <Link to={"/tentang"}><a className="text-black hover:text-gray-600 transition duration-200">Tentang</a></Link>
          </div>
          {/* Conditionally render login/profile button */}
          <div className="hidden lg:flex items-center">
            {auth.isAuthenticated ? (
              <Link to={`${getProfilePath(auth.user?.role)}`}>
                <Button colorScheme='red' borderRadius='full'>
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to={'/login'}>
                <Button colorScheme='red' borderRadius='full'>Masuk →</Button>
              </Link>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none" aria-label="Toggle mobile menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`
          lg:hidden absolute left-0 right-0 top-full bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-4 p-4">
            <Link to={'/'}><a className="text-black hover:text-gray-600 transition duration-200">Beranda</a></Link>
            <Link to={'/inovasi'}><a className="text-black hover:text-gray-600 transition duration-200">Semua Inovasi</a></Link>
            <Link to={'/tentang'}><a className="text-black hover:text-gray-600 transition duration-200">Tentang</a></Link>
            {auth.isAuthenticated ? (
              <Link to={`${getProfilePath(auth.user?.role)}`} className='text-sm'>
                <Button colorScheme='red' size="sm">Profile</Button>
              </Link>
            ) : (
              <Link to={'/login'} className='text-sm'>
                <Button colorScheme='red' size="sm">Masuk →</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
