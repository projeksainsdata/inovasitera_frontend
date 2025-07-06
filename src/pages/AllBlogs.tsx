import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { get } from '@/hooks/useSubmit';
import { BlogType } from '@/types/blog.type';
import { API_URL } from '@/lib/constants/api.contants';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import banner from '@/assets/HeroPage.png';

const AllBlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await get<{ data: BlogType[] }>('/api/v1/blogs?perPage=100');
        setBlogs(res && res.data ? res.data : []);
      } catch (error) {
        console.error('Gagal mengambil data blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Memuat berita...</div>;
  }

  return (
    <>
      <Navbar />
      <img
        src={banner}
        className="h-24 w-full object-cover"
        alt="Hero Banner"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Semua Berita</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/artikel/${blog.slug}`)}
              className="cursor-pointer bg-white rounded-lg border hover:shadow-lg transition p-4"
            >
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail.startsWith('http') ? blog.thumbnail : `${API_URL}${blog.thumbnail}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <div className="text-sm text-gray-500 mb-1">
                {dayjs(blog.updatedAt).format('DD MMM YYYY')}
              </div>
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBlogsPage;
