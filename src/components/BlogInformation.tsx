import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import useBlogsData from "@/hooks/useBlogsData";
import type { BlogType } from "@/types/blog.type";
import { Button } from '@chakra-ui/react';

export default function BlogHomeSection() {
  const { data, loading, error } = useBlogsData({ perPage: 3 });

  return (
    <section className="py-20 px-6 md:px-20 font-spaceGrotesk">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black">Informasi & Berita</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Memuat blog...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error.message}</p>
      ) : data?.data.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada informasi atau berita.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {data?.data.map((blog: BlogType) => (
            <div
              key={blog._id}
              className="rounded-xl border border-white/10 overflow-hidden shadow-md"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-black mb-2">{blog.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {blog.description.split(" ").slice(0, 20).join(" ")}
                  {blog.description.split(" ").length > 20 ? "..." : ""}
                </p>
                <Link
                  to={`/berita/${blog.slug}`}
                  className="inline-flex items-center mt-4 text-colorGreen font-medium group"
                >
                  Baca Selengkapnya{" "}
                  <IconArrowRight
                    className="ml-1 group-hover:translate-x-1 transition"
                    size={18}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Button colorScheme="green" variant="outline">
          <Link to="/berita" className="font-bold">
            Lihat Semua Berita
          </Link>
        </Button>
      </div>
    </section>
  );
}
