import ImageAbout from "../assets/imageAbout.png";
import { Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const AboutHome = () => {
    return (
        <div className="relative w-full overflow-hidden z-[10] mt-[-80px]">
            <div className="absolute inset-0 z-[10]"></div>
            <div className="relative z-[10] mx-auto bg-white md:rounded-t-[60px] rounded-t-[30px]  overflow-hidden">
                <div className="flex flex-col md:flex-row mt-20 px-5 md:px-[100px] space-y-10 md:space-y-0 gap-6">
                    <div className="md:w-1/2">
                        <p className="text-[#B7730E] text-sm md:mt-20 font-semibold mb-2 text-center md:text-left">INOVASI MENGUBAH DUNIA</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">Tentang Inovasi ITERA</h2>
                        <p className="text-gray-600 text-justify md:text-left">
                            Pusat Inovasi ITERA berkomitmen untuk menghadirkan berbagai program unggulan yang dirancang khusus untuk memfasilitasi dan mendukung pengembangan ide-ide kreatif serta inovatif. Dengan fokus pada inovasi, kami berupaya menciptakan lingkungan yang kondusif bagi lahirnya solusi-solusi terobosan.
                        </p>
                        <p className="mt-2 text-gray-600 text-justify md:text-left">
                        Pusat Inovasi ITERA berkomitmen untuk mengubah visi menjadi solusi nyata. Ikuti perjalanan kami dalam menciptakan inovasi yang berdampak dan mendorong kemajuan bersama! Inovasi adalah kunci untuk masa depan yang lebih baik. Ayo kita bersama-sama mengeksplorasi, mengembangkan, dan menerapkan ide-ide terdepan yang akan membentuk dunia. Mari kita ciptakan perubahan yang berarti!
                        </p>
                        <div className="flex justify-center md:justify-start mt-5">
                            <Button colorScheme="red" size="md">
                                <Link to="/tentang" className="text-white font-bold">Lihat Selengkapnya →</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <img src={ImageAbout} alt="About" className="w-full max-w-[500px] md:max-w-none rounded-xl border-2 object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutHome;
