import ImageAbout from "../assets/imageAbout.png";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AboutHome = () => {
  return (
    <div className="relative w-full mt-[-80px] z-10">
      <div className="relative mx-auto bg-white rounded-t-lg md:rounded-t-3xl overflow-hidden">
        <div className="flex flex-col-reverse md:flex-row mt-20 px-5 md:px-24 gap-6">
          <div className="md:w-1/2">
            <p className="text-orange-600 text-sm mt-4 font-semibold mb-2 text-center md:text-left">
              INOVASI MENGUBAH DUNIA
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Tentang Inovasi ITERA
            </h2>
            <p className="text-gray-600 text-justify md:text-left">
              Pusat Inovasi ITERA berkomitmen untuk menghadirkan berbagai
              program unggulan yang dirancang khusus untuk memfasilitasi dan
              mendukung pengembangan ide-ide kreatif serta inovatif. Dengan
              fokus pada inovasi, kami berupaya menciptakan lingkungan yang
              kondusif bagi lahirnya solusi-solusi terobosan.
            </p>
            <p className="mt-2 text-gray-600 text-justify md:text-left">
              Pusat Inovasi ITERA berkomitmen untuk mengubah visi menjadi solusi
              nyata. Ikuti perjalanan kami dalam menciptakan inovasi yang
              berdampak dan mendorong kemajuan bersama! Inovasi adalah kunci
              untuk masa depan yang lebih baik. Ayo kita bersama-sama
              mengeksplorasi, mengembangkan, dan menerapkan ide-ide terdepan
              yang akan membentuk dunia. Mari kita ciptakan perubahan yang
              berarti!
            </p>
            <div className="flex justify-center md:justify-start mt-5">
              <Button colorScheme="red" size="md">
                <Link to="/tentang" className="text-white font-bold">
                  Lihat Selengkapnya →
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={ImageAbout}
              alt="About"
              className="w-full max-w-[500px] rounded-lg border-2 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
