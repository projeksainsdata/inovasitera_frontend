import React from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';

import type {
  CategoriesCreate,
  CategoriesUpdate,
} from '@/lib/types/models.type';

import {
  CATEGORIES,
  CATEGORIES_LABEL,
} from '@/lib/constants/categories.contants';

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
      name: 'type',
      label: 'Tipe Kategori',
      type: 'select',
      options: Object.keys(CATEGORIES).map((key) => ({
        value: CATEGORIES[key as keyof typeof CATEGORIES]!,
        label: CATEGORIES_LABEL[CATEGORIES[key as keyof typeof CATEGORIES]]!,
      })),
      validation: Yup.string().required('Type is required'),
    },
  ];

  const initialValuesForm: CategoriesCreate | CategoriesUpdate =
    initialValues || {
      name: '',
      description: '',
      type: 'merchant',
    };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValuesForm}
      />
    </div>
  );
};

export default FormPortofolio;
