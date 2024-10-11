import React, { useMemo } from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';

import { UserCreate, UserUpdate } from '@/lib/types/user.type';
import { FAKULTAS } from '@/lib/constants/fakultas.constans';
import { PRODI_ARRAY } from '@/lib/constants/prodi.constans';

interface PropsFormUser {
  handleSubmit: (props: UserCreate | UserUpdate) => void;
  initialValues?: UserCreate | UserUpdate | null;
}

const FormUser: React.FC<PropsFormUser> = ({
  handleSubmit,
  initialValues,
}) => {

  const initialValuesForm: UserCreate | UserUpdate =
    initialValues || {
      role: '',
      fullname: '',
      username: '',
      email: '',
      profile: '',
      address: '',
      phonenumber: '',
      gender: '',
      dateOfBirth: '',
      inovator: {
        unit: '',
        fields: [],
        fakultas: '',
        prodi: '',
        status: '',
      },
    };
  const fakultasOptions = useMemo(() =>
    Object.entries(FAKULTAS).map(([, value]) => ({ value: value, label: value })),
    []
  );





  // Remove the declaration of FormUser variable
  const fields: FieldConfig[] = [
    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'member', label: 'Member' },
        { value: 'innovator', label: 'Inovator' },
      ],

      validation: Yup.string().required('Role is required'),
    },
    {
      name: 'fullname',
      label: 'Fullname',
      type: 'text',
      validation: Yup.string().required('Fullname is required'),
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      validation: Yup.string().required('Username is required'),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      validation: Yup.string().required('Email is required'),
    },
    // {
    //   name: 'address',
    //   label: 'Address',
    //   type: 'text',
    // },
    {
      name: 'phonenumber',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      options: [
        { value: 'Laki-laki', label: 'Laki-Laki' },
        { value: 'Perempuan', label: 'Perempuan' },
      ],
    },

    {
      name: "inovator.status",
      label: "Status User",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "active", label: "Accept" },
        { value: "inactive", label: "Reject" },
      ],
    },
  
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date'
    },
    // check if role is inovator

    {
      name: 'profile',
      label: 'Profile',
      type: 'file',
      accept: 'image/*',
    },
  ];

  // check if role is innovator
  const role = initialValues?.role;


  if (role === 'innovator') {
    fields.push(
      {
        name: 'inovator.fakultas',
        label: 'Fakultas',
        type: 'select',
        options: fakultasOptions,
      },
      {
        name: 'inovator.prodi',
        label: 'Prodi',
        type: 'select',
        options: PRODI_ARRAY.map((value) => ({ value: value.label, label: value.label })),
      },
      {
        name: "inovator.status",
        label: "Status user",
        type: "select",
        options: [
          { value: "pending", label: "Pending" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "inactive" },
        ],
      },
    );
  }




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

export default FormUser;
