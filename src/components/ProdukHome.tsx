import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Button, Input, VStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState } from 'react';

import InnovationCard from "../components/InovationCard";
import ImageExample from "@/assets/Hero.png";

interface Item {
  id: number;
  category: string;
  title: string;
  rating: number;
  review: number;
  image: string;
}

const ProdukHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data: Item[] = [
    {
      id: 1,
      category: "Pangan",
      title:"Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image:ImageExample
    },
    {
      id: 2,
      category: "Pangan",
      title:"Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image:ImageExample
    },
    {
      id: 3,
      category: "Pangan",
      title:"Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image:ImageExample
    },
    {
      id: 1,
      category: "Pangan",
      title:"Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image:ImageExample
    },
    {
      id: 1,
      category: "Pangan",
      title:"Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image:ImageExample
    },
  ];
  // Filter data based on search query
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-6 md:mt-0 mt-20">
      <VStack spacing={4} align="stretch">
        <h1 className='text-center font-bold text-xl sm:text-3xl'>Jelajahi Riset & Inovasi ITERA</h1>
        <h2 className='text-center text-base mb-6'>Lihat Semua Inovasi yang ada di ITERA</h2>

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
            className="mySwiper py-2"
          >
            {filteredData.map((item) => (
              <SwiperSlide key={item.id}>
                <InnovationCard inovasi={item}/>
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
