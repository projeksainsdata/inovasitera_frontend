import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import hero from '../assets/Hero.png';
//import heru from '../assets/batik.png'

const Hero = () => {
  return (
    <>
      <div className="relative flex items-center min-h-screen">
        {/* Desktop Image */}
        <img
          src={hero}
          alt="Desktop hero"
          className="object-cover w-full h-full absolute hidden md:block"
        />
        {/* Mobile Image */}
        <img
          src={hero}
          alt="Mobile hero"
          className="object-cover w-full h-full absolute md:hidden"
        />

        {/* Content */}
        <div className="px-5 md:px-20 md:mt-0 mt-[-100px] z-20">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 md:mb-4">
              Pusat Implementasi Inovasi
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold text-red-500 mb-4">
              Institut Teknologi <br /> Sumatera
            </h1>
            <Stack
              spacing={4}
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'center', md: 'flex-start' }}
            >
              <Button colorScheme="red" size="sm" className='w-full'>
                <Link to="/inovasi" className="text-white font-bold">
                  Lihat Semua Inovasi →
                </Link>
              </Button>
              <Button colorScheme="red" variant="outline" size="sm" className='w-full'>
                <Link to="/tentang" className="font-bold">
                  Tentang Kami
                </Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
