import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Hero from "../components/HeroPage";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <h1 className="md:mt-[-200px] mt-[-150px] font-bold md:text-3xl text-4xl relative z-40 md:px-20 px-10">
        Tentang Inovasi ITERA
      </h1>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          {/* Title Section */}
          <div className="text-center mb-8 mt-[200px]">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Inovasi Mengubah Dunia
            </h1>
          </div>

          {/* Description Section */}
          <div className="text-gray-700 text-base leading-relaxed max-w-4xl mx-auto mb-12">
            <p className="mb-4 text-center">
              Pusat Inovasi ITERA berkomitmen untuk menghadirkan berbagai
              program unggulan yang dirancang khusus untuk memfasilitasi dan
              mendukung pengembangan ide-ide kreatif serta inovatif. Dengan
              fokus pada inovasi, kami berupaya menciptakan lingkungan yang
              kondusif bagi lahirnya solusi-solusi terobosan. Kami bertekad
              untuk membangun ekosistem inovasi yang berkelanjutan melalui
              pelaksanaan tugas pokok kami serta pilar-pilar pembangunan yang
              kokoh dan saling berhubungan. Dalam upaya ini, kami memberikan
              dukungan penuh terhadap munculnya ide-ide brilian serta solusi
              nyata yang dapat memberikan manfaat langsung kepada masyarakat.
              Dengan semangat kolaborasi dan kreativitas, ayo bersama-sama kita
              mengembangkan dan mewujudkan ide-ide yang akan membawa perubahan
              positif dan menciptakan dampak yang signifikan. Mari berinovasi
              dan menjadikan dunia tempat yang lebih baik melalui solusi yang
              inovatif dan berkelanjutan.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex bg-yellow-400 p-6 rounded-t-lg justify-between items-center max-w-xl mx-auto">
            <h2 className="text-lg font-bold">Lihat Beragam Inovasi ITERA</h2>
            <Link to={"/inovasi"}>
              <Button
                colorScheme="yellow"
                size="lg"
                className="bg-yellow-200 text-black px-6 py-2 rounded-full"
              >
                Lihat →
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
