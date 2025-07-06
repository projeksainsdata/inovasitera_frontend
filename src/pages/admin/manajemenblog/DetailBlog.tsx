import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { get } from '@/hooks/useSubmit';
import { BlogType } from '@/hooks/useBlogsData';
import { BLOG_PREFIX, API_URL } from '@/lib/constants/api.contants';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import banner from '../../../assets/HeroPage.png';

const DetailArtikel: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [latestArticles, setLatestArticles] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!slug) throw new Error('Slug tidak ditemukan');

        const res = await get<{ data: BlogType }>(BLOG_PREFIX.DETAIL(slug));
        if (!res?.data) throw new Error('Blog tidak ditemukan');

        const blogData = res.data;
        setBlog(blogData);

        // Artikel lain (latest)
        const latestRes = await get<{ data: BlogType[] }>('/api/v1/blogs?perPage=5');
        setLatestArticles(
          (latestRes?.data?.filter((b: BlogType) => b._id !== blogData._id) as BlogType[]) || []
        );
      } catch (err) {
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, navigate]);

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">Memuat artikel...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20 text-xl font-semibold">Blog tidak ditemukan</div>;
  }

  return (
    <>
      <Navbar />
      <img src={banner} className="h-24 w-full object-cover" alt="Hero Banner" />

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Konten utama */}
        <div className="md:col-span-8">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="text-sm text-gray-500 mb-2">
            Ditulis oleh {blog.user?.fullname ?? 'Admin'} • {dayjs(blog.updatedAt).format('DD MMMM YYYY')}
          </div>
          {blog.category?.name && (
            <span className="bg-green-200 text-green-700 px-3 py-1 rounded text-sm mb-4 inline-block">
              {blog.category.name}
            </span>
          )}

          {blog.thumbnail && (
            <img
              src={blog.thumbnail.startsWith('http') ? blog.thumbnail : `${API_URL}${blog.thumbnail}`}
              alt="Thumbnail"
              className="w-full h-auto rounded shadow mb-6"
            />
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4">
          <h2 className="text-xl font-semibold mb-4">Artikel Lainnya</h2>
          <div className="space-y-4">
            {latestArticles.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/artikel/${item.slug}`)}
                className="cursor-pointer group"
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail.startsWith('http') ? item.thumbnail : `${API_URL}${item.thumbnail}`}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <div className="text-sm text-gray-500">{dayjs(item.updatedAt).format('DD MMM YYYY')}</div>
                <h3 className="text-base font-semibold group-hover:underline">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetailArtikel;
