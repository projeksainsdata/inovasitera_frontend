import Kategori1 from "../assets/Kategori1.png"

const categories = [
  "Pangan",
  "Kesehatan",
  "Energi",
  "TIK",
  "Sosial Humaniora",
  "Pendidikan",
  "Seni Budaya",
  "rekayasa Keteknikan"
]

export default function CategoryGrid() {
  return (
    <>
    <div className="min-h-screen mt-[200px]">
    <h1 className="text-center font-bold text-2xl mb-10">Kategory Inovasi</h1>
    <div className="bg-orange-400 p-7 mx-auto">
      <div className="grid grid-cols-4 gap-4 px-[200px]">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`bg-white py-6 px-10 rounded-xl flex flex-col items-center justify-center ${
              index > 5 ? 'col-span-3 sm:col-span-1' : ''
            }`}>
            <div className="bg-teal-600 rounded-full p-2 mb-2">
              <img src={Kategori1} width={70}/>
            </div>
            <span className="text-center text-sm font-bold mt-2">{category}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}