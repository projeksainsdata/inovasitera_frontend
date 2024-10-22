import React from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';

import { CategoriesCreate, CategoriesUpdate } from '@/lib/types/categories.type';

interface PropsFormMerchantdis {
  handleSubmit: (props: CategoriesCreate | CategoriesUpdate) => void;
  initialValues?: CategoriesCreate | CategoriesUpdate | null;
}

const FormPortofolio: React.FC<PropsFormMerchantdis> = ({
  handleSubmit,
  initialValues,
}) => {
  // Remove the declaration of FormPortofolio variable
  const fields: FieldConfig[] = [
    {
      name: 'name',
      label: 'Nama Kategori ',
      type: 'text',
      validation: Yup.string().required('Name is required'),
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'text',
      validation: Yup.string().required('Description is required'),
    },
    {
      name: 'image',
      label: 'gambar Kategori',
      type: 'file' as const,
      accept: 'image/*',
      multiple: false,
    },

  ];

  const initialValuesForm: CategoriesCreate | CategoriesUpdate =
    initialValues || {
      name: '',
      description: '',
      image: '',
    };


  return (
    <div>
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValuesForm}
      />
    </div>
  );
};

export default FormPortofolio;
