import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from "../assets/Logo.png";
import { Button } from '@chakra-ui/react'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
        <nav className="navbar md:px-[200px] flex justify-center transition-all duration-300 fixed top-0 left-0 right-0 z-9999 py-3">
          <div className="rounded-full px-4 md:px-6 py-2 flex items-center justify-between max-w-7xl w-full transition-all duration-300 bg-white shadow">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 md:h-10" />
            </div>
            {/* Desktop menu */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-16 transition-all duration-300 ease-in-out">
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Beranda</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Tentang</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Semua Inovasi</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Kategori</a>
            </div>
            <div className="hidden lg:flex items-center">
              <a href="#">
                <Button colorScheme='red' borderRadius='full'>Masuk →</Button>
              </a>
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
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="flex flex-col space-y-4 p-4">
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Beranda</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Tentang</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Semua Inovasi</a>
              <a href="#" className="text-black hover:text-gray-600 transition duration-200">Kategori</a>
              <a href="#" className='text-sm'>
                <Button colorScheme='red' size="sm">Masuk →</Button>
              </a>
            </div>
          </div>
        </nav>
    </>
  );
};

export default Navbar;