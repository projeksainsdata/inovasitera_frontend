import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Button, Input, VStack, InputGroup, InputRightElement, Box, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState } from 'react';
import {IconSearch} from "@tabler/icons-react";
import InnovationCard from "../components/InovationCard";
import useDataFetch from "@/hooks/useFetchData";
import { INNOVATION_PREFIX } from "@/lib/constants/api.contants";
import { InovationResponse } from "@/lib/types/inovation.type";
import LoadingSpinner from './Loading/LoadingSpinner';

const ProdukHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useDataFetch<InovationResponse>(`${INNOVATION_PREFIX.INDEX}`, {
    page: 1,
    perPage: 10,
  });


  if (loading) {
    return <div className="text-center"><LoadingSpinner /></div>
  }

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const navigate = (url: string) => {
    window.location.href = url;
  }

  return (
    <div className="mx-4 sm:my-10 sm:px-6 md:mt-0 my-20">
      <VStack spacing={4} align="stretch">
        <h1 className='text-center font-bold text-xl sm:text-3xl'>Jelajahi Riset & Inovasi ITERA</h1>
        <h2 className='text-center text-base mb-6'>Lihat Semua Inovasi yang ada di ITERA</h2>
        <InputGroup maxW="600px" mx="auto" mb={6}>
          <Input
            placeholder="Cari Inovasi..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            size="md"
            variant="outline"
            borderRadius='full'
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/inovasi?q=${searchQuery}`)}
          />
          <InputRightElement>
            <button
              onClick={() => navigate(`/inovasi?q=${searchQuery}`)}
              className="bg-red-500 text-white p-2 w-full rounded-full">
            <IconSearch/>
            </button>
          </InputRightElement>
        </InputGroup>

        {/* Loading Spinner or Error Handling */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" />
          </Box>
        ) : error ? (
          <Box textAlign="center" color="red.500">Terjadi Kesalahan: {error.message}</Box>
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
                {data?.data.filter((item) => item.status == "approved").map((item) => (
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
