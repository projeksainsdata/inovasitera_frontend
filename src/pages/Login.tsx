import React from 'react';
import Image from '../assets/ImageLogin.png'
import Logo from '../assets/Logo1.png'
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-screen shadow-lg flex">
        {/* Left Section - Image */}
       
          <img 
            src={Image} 
            alt="Scientist working with a microscope" 
            className="object-cover object-bottom h-screen w-6/12 rounded-l-lg" />

        {/* Right Section - Form */}
        <div className="w-full md:w-6/12 flex flex-col justify-center p-10">
          {/* Logo */}
          <div className="flex mb-6">
            <img 
              src={Logo}
              alt="Logo"
              width={70} 
            />
          </div>
          <h2 className="text-left text-2xl font-bold text-gray-700 mb-2">
            Masuk Kedalam Sistem
          </h2>
          <p className="text-left text-gray-500 mb-6">
            Untuk menggunakan sistem
          </p>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm font-bold text-yellow-500 hover:underline">
                  Lupa Password?
                </a>
              </div>
            </div>

            <Button
                colorScheme='yellow'
                type="submit"
                className="w-full text-white font-bold py-2 px-4 rounded-lg">
                Masuk
            </Button>
          </form>

          <div className="text-center mt-4">
            <Button variant='outline' colorScheme='yellow' className='w-full'>
                <Link
                    to={'/register'}>
                    Daftar Akun
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
