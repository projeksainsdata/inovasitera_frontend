  import Pangan from "../assets/PANGAN.svg";
  import Kesehatan from "../assets/KESEHATAN.svg";
  import Energi from "../assets/ENERGI.svg";
  import TIK from "../assets/TIK.svg";
  import SosialHumaniora from "../assets/SOSHUM.svg";
  import Pendidikan from "../assets/PENDIDIKAN.svg";
  import SeniBudaya from "../assets/SENBUD.svg";
  import RekayasaKeteknikan from "../assets/TEKNIK.svg";
  import batik from "../assets/batikcategory.png";

  import {Link} from "react-router-dom";
  const categories = [
    {
      name: "Pangan",
      icon: Pangan, // Assuming the Pangan icon is imported or available
    },
    {
      name: "Kesehatan",
      icon: Kesehatan, // Assuming the Kesehatan icon is imported or available
    },
    {
      name: "Energi",
      icon: Energi, // Assuming the Energi icon is imported or available
    },
    {
      name: "TIK",
      icon: TIK, // Assuming the TIK icon is imported or available
    },
    {
      name: "Sosial Humaniora",
      icon: SosialHumaniora, // Assuming the SosialHumaniora icon is imported or available
    },
    {
      name: "Pendidikan",
      icon: Pendidikan, // Assuming the Pendidikan icon is imported or available
    },
    {
      name: "Seni Budaya",
      icon: SeniBudaya, // Assuming the SeniBudaya icon is imported or available
    },
    {
      name: "Rekayasa Keteknikan",
      icon: RekayasaKeteknikan, // Assuming the RekayasaKeteknikan icon is imported or available
    },
  ];

  export default function CategoryGrid() {
    return (
      <div className="min-h-screen mt-[200px]">
        <h1 className="text-center font-bold text-3xl mb-3">Kategori Inovasi</h1>
        <h2 className='text-center text-base mb-6'>Lihat Semua Kategori Inovasi yang ada di ITERA</h2>
        <div className="relative bg-orange-400 py-10 mx-auto">
            {/* Ensure the parent container is relative */}
            <div className="absolute right-0 bottom-0">
              <img src={batik} className="w-96 h-[14em] object-cover object-top"/>
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-[200px]">
            {categories.map((category) => (
              <Link to={`/inovasi?kategori=${category.name}`} className="bg-white py-6 md:px-10 rounded-xl flex flex-col items-center justify-center z-10">
                <div className="rounded-full p-2">
                  <img
                    src={category.icon}
                    width={50}
                    className="md:w-[70px]"
                    alt="Category Icon"
                  />
                </div>
                <span className="text-center text-sm font-bold mt-2">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  