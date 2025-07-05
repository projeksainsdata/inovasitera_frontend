import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import useBlogsData, { BlogType } from "@/hooks/useBlogsData";

export default function BlogHomeSection() {
  const { data, loading, error } = useBlogsData({ perPage: 3 });

  return (
    <section className="py-20 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black">Informasi & Berita</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Memuat blog...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error.message}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {data?.data.map((blog: BlogType) => (
            <div
              key={blog._id}
              className="bg-[#121212] rounded-xl border border-white/10 overflow-hidden"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                <p className="text-gray-300 text-sm">
                  {blog.description.split(" ").slice(0, 30).join(" ")}
                  {blog.description.split(" ").length > 30 && "..."}
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
        <Link
          to="/berita"
          className="inline-flex items-center px-6 py-3 bg-colorGreen text-white rounded-full hover:bg-colorItera transition"
        >
          Lihat Semua Berita
        </Link>
      </div>
    </section>
  );
}
