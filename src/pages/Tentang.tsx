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
    <h1 className='mt-[-200px] font-bold text-3xl relative z-40 px-20'>Tentang Inovasi Itera</h1>
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
            Peningkatan komersialisasi inovasi membutuhkan peningkatan knowledge flow baik ke dalam maupun ke luar IPB melalui jejaring dan kemitraan strategis. Peningkatan knowledge flow ke dalam IPB diperlukan untuk mendapatkan informasi tentang inovasi yang dibutuhkan oleh industri, sedangkan peningkatan knowledge flow ke luar IPB dilakukan untuk mempromosikan komersialisasi inovasi IPB kepada industri. Terutama industri dalam negeri agar dapat memanfaatkan inovasi. Dengan lancarnya flow of knowledge tersebut maka agenda riset IPB akan dapat difokuskan secara lebih tajam, sesuai kebutuhan industri dan strategi inovasi dalam upaya mengatasi masalah-masalah perekonomian, sekaligus meningkatkan income generating IPB.
          </p>
          <p className="mb-4">
            IPB Innovation dirancang sebagai alat untuk mempromosikan/menawari inovasi yang dihasilkan oleh sivitas akademika IPB kepada masyarakat industri dan calon penggunanya. Inovasi IPB ini didasarkan pada kegiatan riset yang mengedepankan kepakaran dan kompetensi riset dari para inovator IPB. Inovator juga berfungsi sebagai role model secara profesional antar inovator dengan calon pengguna teknologi atau untuk mitra bisnis IPB. Inovasi IPB menawarkan fitur-fitur plotifatif yang lengkap, mulai dari hasil riset dalam skala laboratorium, prototype, paten, lisensi, hingga produk yang siap dipasarkan.
          </p>
          <p className="mb-4">
            IPB Innovation juga menjadi alat diseminasi secara terbuka mengenai inovasi yang dihasilkan oleh inovator, termasuk hasil dan kesiapan teknologi.
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
