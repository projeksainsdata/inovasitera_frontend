import React from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';

import { InovationCreateSchema, InovationUpdateSchema } from '@/lib/types/inovation.type';
import useCategories from '@/hooks/useCategories';

interface PropsFormInovation {
  handleSubmit: (props: InovationCreateSchema | InovationUpdateSchema) => void;
  initialValues?: InovationCreateSchema | InovationUpdateSchema | null;
}

const FormInovation: React.FC<PropsFormInovation> = ({
  handleSubmit,
  initialValues,
}) => {
  const { data } = useCategories();
  // Remove the declaration of FormInovation variable
  const fields: FieldConfig[] = [
    {
      name: 'title',
      label: 'Nama Produk Inovasi',
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
      name: 'Image',
      label: 'Image',
      type: 'file',
      accept: 'image/*',
      multiple: false,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: data?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'radio',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
      ],

      validation: Yup.string().required('Status is required'),
    },



  ];

  const initialValuesForm: InovationCreateSchema | InovationUpdateSchema =
    initialValues || {
      _id: '',
      user_id: '',
      title: '',
      description: '',
      Image: '',
      category: '',
      status: 'pending',
    };


  return (
    <div className="mx-auto mt-8 max-w-md">
      <GenericForm
        fields={fields}
        onSubmit={(values) => handleSubmit(values as InovationCreateSchema | InovationUpdateSchema)}
        initialValues={initialValuesForm}
      />
    </div>
  );
};

export default FormInovation;
