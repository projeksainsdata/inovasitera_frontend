import React, { useState } from "react";
import Navbar from "../components/navbar";
import HeroPage from "../components/HeroPage";
import Footer from "../components/Footer";
import CategorySidebar from "../components/KategoryInovasi";
import InnovationCard from "../components/InovationCard";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import ImageExample from "@/assets/Hero.png";

const InnovationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const innovationsPerPage = 6; // Number of innovations per page

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const innovations = [
    {
      id: 1,
      category: "Pangan",
      title: "Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image: ImageExample,
    },
    {
      id: 2,
      category: "Pangan",
      title: "Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image: ImageExample,
    },
    {
      id: 3,
      category: "Pangan",
      title: "Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image: ImageExample,
    },
    {
      id: 1,
      category: "Pangan",
      title: "Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image: ImageExample,
    },
    {
      id: 1,
      category: "Pangan",
      title: "Contoh Produk Inovasi ITERA",
      rating: 4.5,
      review: 10,
      image: ImageExample,
    },
  ];

  const totalPages = Math.ceil(innovations.length / innovationsPerPage);

  const indexOfLastInnovation = currentPage * innovationsPerPage;
  const indexOfFirstInnovation = indexOfLastInnovation - innovationsPerPage;
  const currentInnovations = innovations.slice(
    indexOfFirstInnovation,
    indexOfLastInnovation
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [categoryMobile,setCategoryMobile] = useState(false);
  return (
    <>
      <Navbar />
      <HeroPage />
      <div className="relative z-20">
        {/* Header Section */}
        <div className="py-8 text-center md:mt-[-300px] mt-[-200px] px-8">
          <h1 className="md:text-4xl text-2xl font-bold text-red-500">
            Semua Inovasi PII ITERA
          </h1>
          <div className="mt-7">
            <input
              type="text"
              placeholder="Cari inovasi..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-full w-full max-w-md md:w-1/2"
            />
          </div>
        </div>
        
        {categoryMobile && <CategorySidebar close={()=>setCategoryMobile(!categoryMobile)} className="bg-white fixed w-full p-4 bottom-0 border-2 rounded-t-3xl transition-all block md:hidden"/>}

        <div className="container mx-auto mt-8 px-4 flex flex-col gap-6 md:flex-row mb-20 md:mt-[200px]">
          {/* Sidebar Categories */}
          <CategorySidebar className="bg-white border rounded-lg shadow-md p-4 md:w-1/4 h-fit overflow-y-auto sticky top-[100px] hidden md:block" />

          {/* Innovation Cards Section */}
          <main className="w-full md:w-3/4">
            <div className="flex justify-between my-8">
              <h2 className="text-xl font-bold">
                Hasil dari "{searchQuery}" (621)
              </h2>
              <button onClick={()=>setCategoryMobile(!categoryMobile)} className="block md:hidden">Kategori</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentInnovations.map((innovation, index) => (
                <InnovationCard inovasi={innovation} />
              ))}
            </div>

            {/* Centered Pagination Buttons */}
            <Box mt={8} display="flex" justifyContent="center">
              <ButtonGroup>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    colorScheme="red"
                    key={index}
                    onClick={() => paginate(index + 1)}
                    isActive={index + 1 === currentPage}
                  >
                    {index + 1}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InnovationPage;
