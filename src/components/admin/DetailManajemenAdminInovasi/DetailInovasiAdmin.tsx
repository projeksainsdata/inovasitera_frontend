import React from 'react';

const DetailInovasiAdmin: React.FC = () => {
  // Data dummy
  const data = {
    id: '1',
    title: 'Judul Inovasi',
    image: 'https://via.placeholder.com/600x400?text=Inovasi+Image', // Gambar placeholder dengan teks
    description:
      'Deskripsi inovasi. Ini adalah deskripsi dari inovasi yang digunakan sebagai data.',
  };

  // Handler untuk tombol Acc dan Tolak
  const handleAccept = () => {
    console.log('Inovasi diterima');
    alert('Inovasi diterima');
  };

  const handleReject = () => {
    console.log('Inovasi ditolak');
    alert('Inovasi ditolak');
  };

  return (
    <div className="container mx-auto p-4">
      {/* Kontainer flex untuk judul dan tombol */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAccept}
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Acc
          </button>
          <button
            onClick={handleReject}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Tolak
          </button>
        </div>
      </div>
      {/* Mengatur ukuran gambar */}
      <img
        src={data.image}
        alt={data.title}
        className="mb-4 w-1/2 h-auto mx-auto"
      />
      <p className="mb-4">{data.description}</p>
    </div>
  );
};

export default DetailInovasiAdmin;
