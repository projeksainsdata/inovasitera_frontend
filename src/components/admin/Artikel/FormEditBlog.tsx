import React, { useState } from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCategories from '@/hooks/useCategories';
import { BlogFormData } from '@/types/blog.type';

interface PropsFormBlog {
  initialValues: BlogFormData;
  handleSubmit: (values: BlogFormData) => void;
}

const FormEditBlog: React.FC<PropsFormBlog> = ({ handleSubmit, initialValues }) => {
  const { data: categories } = useCategories();

  const [content, setContent] = useState<string>(initialValues.content || '');
  const [thumbnail, setThumbnail] = useState<string | File>(initialValues.thumbnail || '');

  const fields: FieldConfig[] = [
    {
      name: 'title',
      label: 'Judul',
      type: 'text',
      validation: Yup.string().required('Judul wajib diisi'),
    },
    {
      name: 'description',
      label: 'Deskripsi Singkat',
      type: 'textarea',
      validation: Yup.string().required('Deskripsi wajib diisi'),
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'file',
      accept: 'image/*',
      multiple: false,
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      options: categories?.map(cat => ({ label: cat.name, value: cat._id })) || [],
      validation: Yup.string().required('Kategori wajib dipilih'),
    },
    {
      name: 'status',
      label: 'Status',
      type: 'radio',
      options: [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Publish' },
      ],
      validation: Yup.string().required('Status harus dipilih'),
    },
  ];

const onFormSubmit = (values: any) => {
  const finalThumbnail =
    values.thumbnail instanceof File || typeof values.thumbnail === 'string'
      ? values.thumbnail
      : thumbnail;

    handleSubmit({
      title: values.title,
      description: values.description,
      thumbnail: finalThumbnail,
      status: values.status,
      content,
      slug: initialValues.slug,
      categoryName: values.category.name, // ✅ ini yang akan dikirim ke backend
    });
  };



  return (
    <div className="space-y-6">
      <GenericForm
        fields={fields}
        onSubmit={onFormSubmit}
        initialValues={{
          ...initialValues,
          status: initialValues.status?.toUpperCase() || 'DRAFT',
        }}
        onChange={(fieldName, value) => {
          if (fieldName === 'thumbnail') {
            setThumbnail(value);
          }
        }}
      />

      {typeof thumbnail === 'string' && thumbnail !== '' && (
        <div className="mt-4">
          <label className="block font-medium mb-1">Thumbnail Saat Ini:</label>
          <img
            src={thumbnail}
            alt="Thumbnail Lama"
            className="w-48 rounded border"
          />
        </div>
      )}

      <div>
        <label className="block font-medium mb-1 mt-4">Konten Blog</label>
        <div className="bg-white border rounded-md">
          <ReactQuill
            value={content}
            onChange={setContent}
            className="min-h-[250px] max-w-full resize-y"
            placeholder="Tulis konten blog di sini..."
          />
        </div>
      </div>
    </div>
  );
};

export default FormEditBlog;
