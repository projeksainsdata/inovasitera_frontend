import React, { useState } from "react";
import Navbar from "../components/navbar";
import HeroPage from "../components/HeroPage";
import Footer from "../components/Footer";
import CategorySidebar from "../components/KategoryInovasi";
import InnovationCard from "../components/InovationCard";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";

const InnovationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const innovationsPerPage = 6; // Number of innovations per page

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const innovations = [
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
    },
    {
      category: "Pangan",
      rating: 4.5,
      title:
        "Formula Inokulan Bakteri Bintil Akar untuk Peningkatan Produksi Kedelai pada Lahan Kering Asam (pH > 4.0)",
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

  return (
    <>
      <Navbar />
      <HeroPage />
      <div className="min-h-screen relative z-20">
        {/* Header Section */}
        <div className="py-8 text-center md:mt-[-300px] mt-[-200px] px-8">
          <h1 className="md:text-4xl text-2xl font-bold text-red-500">
            Semua Inovasi
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

        <div className="container mx-auto mt-8 px-4 flex flex-col md:flex-row mb-20 mt-[200px]">
          {/* Sidebar Categories */}
          <CategorySidebar />

          {/* Innovation Cards Section */}
          <main className="md:w-3/4 md:pl-6">
            <h2 className="text-xl font-bold mb-4">
              Hasil dari "{searchQuery}" (621)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentInnovations.map((innovation, index) => (
                <InnovationCard
                  key={index}
                  category={innovation.category}
                  rating={innovation.rating}
                  title={innovation.title}
                />
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
        <Footer />
      </div>
    </>
  );
};

export default InnovationPage;
