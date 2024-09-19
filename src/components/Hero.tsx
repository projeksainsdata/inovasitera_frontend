import { Button,Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import hero from '../assets/Hero.png'
import heru from '../assets/batik.png'

const Hero = ()  => {
    return (
        <>
        <div className="relative flex items-center min-h-screen">
            <img
                src={hero}
                alt="Desktop hero"
                className="object-cover w-full h-full absolute hidden md:block"/>
            <img
            src={heru}
            alt="Mobile hero"
            className="object-cover w-full h-full absolute md:hidden"/>
            <div className="px-20 z-20">
                <div className='text-left'>
                    <h1 className="text-3xl font-bold text-black mb-4">Pusat Implementasi Inovasi</h1>
                    <h1 className="text-6xl font-bold text-red-500 mb-4">Institut Teknologi <br /> Sumatera</h1>
                    <Stack spacing={4} direction='row' align='center'>
                    <Button colorScheme="red" size="sm">
                        <Link to="/about" className="text-white font-bold">Lihat Semua Inovasi →</Link>
                    </Button>
                    <Button colorScheme="red" variant='outline' size="sm">
                        <Link to="/about" className="font-bold">Tentang Kami</Link>
                    </Button>
                    </Stack>
                </div>
            </div>
        </div>
        </>
    )
}

export default Hero;