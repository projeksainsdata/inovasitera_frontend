import LogoFooter from '../assets/LogoFooter.png'
import Batik from '../assets/batik.png'
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-200 text-gray-800 py-6 px-20">
      <div className="container mx-auto flex justify-start gap-[220px] items-start"> 
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 mb-5">
            <img src={LogoFooter} alt="Logo 1" className="w-100" />
          </div>
          <div>
            <p className='max-w-[400px]'>
              <strong>Alamat:</strong> Gedung C ITERA, Jl. Terusan Ryacudu, Way Huwi, Lampung Selatan, Lampung
            </p>
            <p>
              <strong>Kontak:</strong> pusatriset@itera.ac.id
            </p>
          </div>
        </div>
        <div className=''>
          <h3 className="font-semibold mb-2">Kategori</h3>
          <ul className="space-y-1">
            <li>Pangan</li>
            <li>Kesehatan</li>
            <li>Energi</li>
            <li>TIK</li>
            <li>Sosial Humaniora</li>
            <li>Pendidikan</li>
            <li>Seni dan Budaya</li>
            <li>Rekayasa Keteknikan</li>
          </ul>
        </div>
        
        <div className="absolute right-0 bottom-0">
          <img src={Batik} alt="Pattern" className="w-[300px]" />
        </div>
      </div>

      <div className="text-left mt-6 text-sm">
        PUSAT IMPLEMENTASI INOVASI ITERA. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
