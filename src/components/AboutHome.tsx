import ImageAbout from "../assets/imageAbout.png"
import { Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const AboutHome = () => {
    return (
        <>
        <div className="relative w-full overflow-hidden z-[10] mt-[-80px]">
            <div className="absolute inset-0 z-[10]"></div>
            <div className="relative z-[10] mx-auto bg-white rounded-t-[60px] overflow-hidden">
                <div className="flex mt-20 px-[100px]">
                    <div className="mt-[-20px]">
                        <p className="text-[#B7730E] text-sm mt-20 font-semibold mb-2">INOVASI MENGUBAH DUNIA</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Tentang Inovasi ITERA</h2>
                        <p className="text-gray-600">Pusat Inovasi ITERA berkomitmen untuk menghadirkan berbagai program unggulan yang dirancang khusus untuk memfasilitasi dan mendukung pengembangan ide-ide kreatif serta inovatif. Dengan fokus pada inovasi, kami berupaya menciptakan lingkungan yang kondusif bagi lahirnya solusi-solusi terobosan.</p>
                        <Button colorScheme="red" size="sm" className="mt-5">
                            <Link to="/" className="text-white font-bold">Lihat Selengkapnya →</Link>
                        </Button>
                    </div>
                    <div>
                        <img src={ImageAbout} alt="image" width={1000}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutHome;