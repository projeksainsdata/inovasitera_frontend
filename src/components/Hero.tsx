import { Link } from 'react-router-dom';
import { Button,Stack } from '@chakra-ui/react';

const Hero = ()  => {
    return (
        <>
        <div className="min-h-screen bg-gradient-to-b from-white to-orange-300 mt-[-5px] flex items-center px-20">
            <div className='text-left'>
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Pusat Implementasi Inovasi</h1>
                <h1 className="text-5xl font-bold text-blue-500 mb-4">Institut Teknologi <br /> Sumatera</h1>
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
        </>
    )
}

export default Hero;