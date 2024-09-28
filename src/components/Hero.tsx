import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import hero from '../assets/Hero.png';

const Hero = () => {
  return (
    <>
      <div className="relative flex items-center min-h-screen">
        {/* Parallax Background for Desktop */}
        <div
          className="hidden md:block absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Parallax effect
          }}
        ></div>

        {/* Mobile Image (non-parallax) */}
        <div
          className="block md:hidden absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Parallax effect
          }}
        ></div>

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
              <Button colorScheme="red" size="lg" className="w-full">
                <Link to="/inovasi" className="text-white font-bold">
                  Lihat Semua Inovasi →
                </Link>
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                size="lg"
                className="w-full"
              >
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
