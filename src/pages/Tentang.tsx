import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import Hero from '../components/HeroPage';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <h1 className='md:mt-[-200px] mt-[-150px] font-bold md:text-3xl text-4xl relative z-40 md:px-20 px-10'>Tentang Inovasi Itera</h1>
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Section */}
        <div className="text-center mb-8 mt-[200px]">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Inovasi Mengubah Dunia
          </h1>
        </div>

        {/* Description Section */}
        <div className="text-gray-700 text-base leading-relaxed max-w-4xl mx-auto mb-12">
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium facilis sapiente dolorem commodi dolor adipisci cupiditate voluptates tenetur ipsa expedita eos exercitationem, saepe earum officia. Vero sapiente repellendus repudiandae est.
          </p>
          <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium facilis sapiente dolorem commodi dolor adipisci cupiditate voluptates tenetur ipsa expedita eos exercitationem, saepe earum officia. Vero sapiente repellendus repudiandae est.
          </p>
          <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium facilis sapiente dolorem commodi dolor adipisci cupiditate voluptates tenetur ipsa expedita eos exercitationem, saepe earum officia. Vero sapiente repellendus repudiandae est.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex bg-yellow-400 p-6 rounded-t-lg justify-between items-center max-w-xl mx-auto">
            <h2 className="text-lg font-bold">
                Lihat Beragam Inovasi ITERA
            </h2>
            <Button colorScheme="yellow" size="lg" className="bg-yellow-200 text-black px-6 py-2 rounded-full">
                <Link to={'/inovasi'}>Lihat →</Link>
            </Button>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default AboutPage;
