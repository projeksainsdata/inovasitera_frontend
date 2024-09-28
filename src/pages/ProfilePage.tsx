import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApiService from '../services/apiServices/auth.api.service';
import Navbar from '@/components/navbar';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: 'male',
    faculty: '',
    program: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogout = async () => {
    try {
        await AuthApiService.logout();
        // Refresh halaman
        window.location.reload();
      // Redirect to the index page after a short delay to ensure the page has time to reload
      setTimeout(() => {
        navigate('/');
      }, 10);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-8 mt-20">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700">Nama</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Value"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Value"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-gray-700">Nomor Handphone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Value"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="birthdate" className="block text-gray-700">Tanggal Lahir</label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700">Jenis Kelamin</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Laki-laki</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Perempuan</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="faculty" className="block text-gray-700">Fakultas</label>
            <select
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select faculty</option>
              <option value="value">Value</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="program" className="block text-gray-700">Program Studi</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select program</option>
              <option value="value">Value</option>
            </select>
          </div>
          
          <button type="submit" className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-10">Wishlist Inovasi</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">No</th>
              <th className="text-left p-2">Gambar</th>
              <th className="text-left p-2">Judul</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">
                <img
                  className="w-24 h-24 object-cover"
                  src="https://via.placeholder.com/150"
                  alt="Wishlist Item"
                />
              </td>
              <td className="p-2">
                Fabrikasi dan Hiltrasi Rompi Anti Peluru Berbahan Biomass Sawit
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;