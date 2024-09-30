import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Button, Input, VStack, InputGroup, InputRightElement, Box, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState } from 'react';

import InnovationCard from "../components/InovationCard";
import useDataFetch from "@/hooks/useFetchData";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { InovationResponse } from "@/lib/types/inovation.type";

const ProdukHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useDataFetch<InovationResponse>(`${INNOVATION_PREFIX.INDEX}`, {
    q: searchQuery, // Send the search query to filter data
  });

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="py-6 px-4 sm:py-10 sm:px-6 md:mt-0 mt-20">
      <VStack spacing={4} align="stretch">
        <h1 className='text-center font-bold text-xl sm:text-3xl'>Jelajahi Riset & Inovasi ITERA</h1>
        <h2 className='text-center text-base mb-6'>Lihat Semua Inovasi yang ada di ITERA</h2>
        
        {/* Search Input */}
        <InputGroup maxW="600px" mx="auto" mb={6}>
          <Input
            placeholder="Cari inovasi..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            size="md"
            variant="outline"
            borderRadius='full'
          />
          <InputRightElement>
            <button
              onClick={() => handleSearch('')}
              className="text-gray-600 hover:text-gray-800 focus:outline-none">
              ✕
            </button>
          </InputRightElement>
        </InputGroup>

        {/* Loading Spinner or Error Handling */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
          </Box>
        ) : error ? (
          <Box textAlign="center" color="red.500">Error: {error.message}</Box>
        ) : (
          <>
            {/* Swiper Container */}
            <div className="relative">
              <Swiper
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="mySwiper py-2"
              >
                {data?.data.map((item) => (
                  <SwiperSlide key={item._id}>
                    <InnovationCard inovasi={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
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
