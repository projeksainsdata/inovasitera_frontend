import React from 'react';
import GenericForm, { FieldConfig } from '@/components/Form/GenericForm';
import * as Yup from 'yup';

import { UserCreate, UserUpdate } from '@/lib/types/user.type';

interface PropsFormUser {
  handleSubmit: (props: UserCreate | UserUpdate) => void;
  initialValues?: UserCreate | UserUpdate | null;
}

const FormUser: React.FC<PropsFormUser> = ({
  handleSubmit,
  initialValues,
}) => {
  // Remove the declaration of FormUser variable
  const fields: FieldConfig[] = [

    //   role?: string;
    // fullname: string;
    // username: string;
    // email: string;
    // password: string;
    // provider?: string;
    // profile?: string;
    // address?: string;
    // phonenumber?: string;
    // gender?: string;
    // dateOfBirth?: string;
    // forgotPassword?: string;
    // resetPassword?: string;
    // inovator?: {
    //   unit?: string;
    //   fields?: any[];
    //   itera_fakultas?: string;
    //   itera_prodi?: string;
    // };

    {
      name: 'role',
      label: 'Role',
      type: 'radio',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'member', label: 'Member' },
        { value: 'inovator', label: 'Inovator' },
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
    {
      name: 'password',
      label: 'Password',
      type: 'text',
    },
    {
      name: 'profile',
      label: 'Profile',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'phonenumber',
      label: 'Phonenumber',
      type: 'text',
    },
    {
      name: "gender",
      label: "gender ",
      type: "radio",
      options: [
        { value: 'Laki-laki', label: 'Laki-laki' },
        { value: 'Perempuan', label: 'Perempuan' },
      ],
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'text',
    },


  ];

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

export default FormUser;
