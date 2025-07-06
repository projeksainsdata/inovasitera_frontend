import React, { useState } from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';
import useCategories from '@/hooks/useCategories';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface BlogFormSchema {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: 'DRAFT' | 'PUBLISHED';
  thumbnail?: string;
  content: string;
}

interface PropsFormBlog {
  handleSubmit: (values: BlogFormSchema) => void;
  initialValues?: BlogFormSchema | null;
}

const FormBlog: React.FC<PropsFormBlog> = ({ handleSubmit, initialValues }) => {
  const { data: categories } = useCategories();
  const [content, setContent] = useState(initialValues?.content || '');

  const fields: FieldConfig[] = [
    {
      name: 'title',
      label: 'Judul',
      type: 'text',
      validation: Yup.string().required('Judul wajib diisi'),
    },
    {
      name: 'description',
      label: 'Deskripsi',
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
      options:
        categories?.map((cat) => ({
          label: cat.name,
          value: cat._id,
        })) || [],
      validation: Yup.string().required('Kategori wajib diisi'),
    },
    {
      name: 'status',
      label: 'Status',
      type: 'radio',
      options: [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Publish' },
      ],
      validation: Yup.string().required('Status wajib diisi'),
    },
  ];

  const initialValuesForm: Partial<BlogFormSchema> = initialValues || {
    title: '',
    description: '',
    thumbnail: '',
    category: '',
    status: 'DRAFT',
    content: '',
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const onSubmitWithSlug = (values: any) => {
    const finalValues: BlogFormSchema = {
      ...values,
      slug: generateSlug(values.title || ''),
      content: content,
    };
    handleSubmit(finalValues);
  };

  return (
    <div className="mx-auto mt-8 max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <button
          type="submit"
          form="generic-form"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Simpan Blog
        </button>
      </div>

      <GenericForm
        fields={fields}
        onSubmit={onSubmitWithSlug}
        initialValues={initialValuesForm}
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Konten Blog
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="bg-white"
          placeholder="Tulis isi blog disini..."
        />
      </div>
    </div>
  );
};

export default FormBlog;
