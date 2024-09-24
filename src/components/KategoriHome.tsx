import Pangan from "../assets/PANGAN.svg";
import Kesehatan from "../assets/KESEHATAN.svg";
import Energi from "../assets/ENERGI.svg";
import TIK from "../assets/TIK.svg";
import SosialHumaniora from "../assets/SOSHUM.svg";
import Pendidikan from "../assets/PENDIDIKAN.svg";
import SeniBudaya from "../assets/SENBUD.svg";
import RekayasaKeteknikan from "../assets/TEKNIK.svg";

const categories = [
  {
    name: "Pangan",
    icon: Pangan, // Assuming the Pangan icon is imported or available
    url: "/pangan",
  },
  {
    name: "Kesehatan",
    icon: Kesehatan, // Assuming the Kesehatan icon is imported or available
    url: "/kesehatan",
  },
  {
    name: "Energi",
    icon: Energi, // Assuming the Energi icon is imported or available
    url: "/energi",
  },
  {
    name: "TIK",
    icon: TIK, // Assuming the TIK icon is imported or available
    url: "/tik",
  },
  {
    name: "Sosial Humaniora",
    icon: SosialHumaniora, // Assuming the SosialHumaniora icon is imported or available
    url: "/sosial-humaniora",
  },
  {
    name: "Pendidikan",
    icon: Pendidikan, // Assuming the Pendidikan icon is imported or available
    url: "/pendidikan",
  },
  {
    name: "Seni Budaya",
    icon: SeniBudaya, // Assuming the SeniBudaya icon is imported or available
    url: "/seni-budaya",
  },
  {
    name: "Rekayasa Keteknikan",
    icon: RekayasaKeteknikan, // Assuming the RekayasaKeteknikan icon is imported or available
    url: "/rekayasa-keteknikan",
  },
];

export default function CategoryGrid() {
  return (
    <div className="min-h-screen mt-[200px]">
      <h1 className="text-center font-bold text-2xl mb-10">Kategori Inovasi</h1>
      <div className="bg-orange-400 p-3 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-0 md:px-[200px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`bg-white py-6 md:px-10 rounded-xl flex flex-col items-center justify-center ${
                index >= 6 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="rounded-full p-2 mb-2">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
