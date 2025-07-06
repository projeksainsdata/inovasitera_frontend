import React from 'react';
import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import FormBlog, { BlogFormSchema } from '@/components/admin/Artikel/FormBlog';
import { BLOG_PREFIX } from '@/lib/constants/api.contants';
import { post, UploadImage } from '@/hooks/useSubmit';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TambahBlog = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (values: BlogFormSchema) => {
    try {
      // Cek apakah thumbnail adalah File, jika iya maka upload terlebih dahulu
      if (values.thumbnail && typeof values.thumbnail === 'object' && 'name' in values.thumbnail) {
        const thumbnailFile = values.thumbnail as File;
        const uploadRes = await UploadImage({ file: thumbnailFile });

        if (!uploadRes.success || !uploadRes.url) {
          throw new Error(uploadRes.message || 'Gagal upload thumbnail');
        }

        values.thumbnail = uploadRes.url; // Ganti dengan URL hasil upload
      }

      // Kirim data blog ke server
      await post({ url: BLOG_PREFIX.CREATE, data: values });

      toast.success('Blog berhasil ditambahkan');
      navigate('/admin/blog');
    } catch (err: any) {
      toast.error(err.message || 'Gagal menambahkan blog');
    }
  };

  return (
    <LayoutAdmin>
      <FormBlog handleSubmit={handleSubmit} />
    </LayoutAdmin>
  );
};

export default TambahBlog;
