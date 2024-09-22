import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Produk from '../assets/Kategori1.png';
import { Button, Input, VStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState } from 'react';

interface Item {
  id: number;
  category: string;
  title: string;
  rating: number;
  reviews: number;
}

const ProdukHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data: Item[] = [
    {
      id: 1,
      category: 'Pangan',
      title: 'Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)',
      rating: 4.5,
      reviews: 10,
    },
    {
        id: 2,
        category: 'Pangan',
        title: 'Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)',
        rating: 4.5,
        reviews: 10,
      },
      {
        id: 3,
        category: 'Pangan',
        title: 'Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)',
        rating: 4.5,
        reviews: 10,
      },
      {
        id: 4,
        category: 'Pangan',
        title: 'Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)',
        rating: 4.5,
        reviews: 10,
      },
      {
        id: 5,
        category: 'Pangan',
        title: 'Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)',
        rating: 4.5,
        reviews: 10,
      },
    
  ];

  // Filter data based on search query
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Card: React.FC<{ item: Item }> = ({ item }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-5 mt-10">
      <div className="bg-white rounded-lg p-4 mb-1 mt-3 flex text-center items-center justify-center">
        <img src={Produk} alt="produk" />
      </div>
      <div className='flex justify-between'>
        <span className="inline-block bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {item.category}
        </span>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(item.rating))}</span>
          <span className="ml-2 text-xs text-gray-600">{item.rating.toFixed(1)} ({item.reviews})</span>
        </div>
      </div>
      <h3 className="text-sm font-semibold line-clamp-3">{item.title}</h3>
    </div>
  );

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-6 md:mt-0 mt-20">
      <VStack spacing={4} align="stretch">
        <h1 className='text-center font-bold text-xl sm:text-2xl'>Jelajahi Riset & Inovasi ITERA</h1>
        <h2 className='text-center text-sm mb-6'>Lihat Semua Inovasi yang ada di ITERA</h2>

        {/* Search Form */}
        <InputGroup maxW="600px" mx="auto" mb={6}>
        <Input
          placeholder="Cari inovasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="md"
          variant="outline"
          borderRadius='full'
        />
        <InputRightElement>
          <button
            onClick={() => setSearchQuery('')}
            className="text-gray-600 hover:text-gray-800 focus:outline-none">
            ✕
          </button>
        </InputRightElement>
      </InputGroup>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Pagination]}
            // pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="mySwiper"
          >
            {filteredData.map((item) => (
              <SwiperSlide key={item.id}>
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-8">
          <Button colorScheme="red" variant='outline'>
            <Link to="/inovasi" className="font-bold">Lihat Semua Inovasi</Link>
          </Button>
        </div>
      </VStack>
    </div>
  );
};

export default ProdukHome;
