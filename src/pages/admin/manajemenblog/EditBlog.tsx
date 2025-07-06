// EditBlog.tsx
import React, { useEffect, useState } from 'react';
import LayoutAdmin from '@/components/admin/layoutAdmin/LayoutAdmin';
import FormEditBlog from '@/components/admin/Artikel/FormEditBlog';
import { useParams, useNavigate } from 'react-router-dom';
import { get, put, UploadImage } from '@/hooks/useSubmit';
import { BLOG_PREFIX } from '@/lib/constants/api.contants';
import toast from 'react-hot-toast';
import { BlogFormData } from '@/types/blog.type';

const EditBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<BlogFormData | null>(null);

  useEffect(() => {
    if (slug) {
      get(BLOG_PREFIX.DETAIL(slug))
        .then((res) => res && setInitialValues(res.data))
        .catch(() => toast.error('Gagal memuat data blog'));
    }
  }, [slug]);

  const handleSubmit = async (values: BlogFormData) => {
    try {
      // Upload thumbnail jika berupa file
      if (values.thumbnail && typeof values.thumbnail === 'object' && 'name' in values.thumbnail) {
        const thumbnailFile = values.thumbnail as File;
        const uploadRes = await UploadImage({ file: thumbnailFile });

        if (!uploadRes.success || !uploadRes.url) {
          throw new Error(uploadRes.message || 'Gagal upload thumbnail');
        }

        values.thumbnail = uploadRes.url;
      }

      await put<BlogFormData, BlogFormData>({
        url: `${BLOG_PREFIX.UPDATE}/${slug}`,
        data: values,
      });

      toast.success('Blog berhasil diperbarui');
      navigate('/admin/blog');
    } catch (err: any) {
      toast.error(err.message || 'Gagal memperbarui blog');
    }
  };

  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      {initialValues ? (
        <FormEditBlog handleSubmit={handleSubmit} initialValues={initialValues} />
      ) : (
        <div>Memuat data...</div>
      )}
    </LayoutAdmin>
  );
};

export default EditBlog;
