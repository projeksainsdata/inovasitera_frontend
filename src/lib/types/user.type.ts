/* eslint-disable @typescript-eslint/no-explicit-any */
export interface USER {
  inovator: Inovator;
  _id: string;
  role: string;
  fullname: string;
  username: string;
  email: string;
  provider: string;
  address: string;
  phonenumber: string;
  forgotPassword: string;
  resetPassword: string;
  emailVerify: string;
  emailVerified: boolean;
  profile: string;
  dateOfBirth: string;
  gender: string;
}

export interface Inovator {
  unit: string;
  fields: any[];
  itera_fakultas?: string;
  itera_prodi?: string;
  status: string;
  fakultas: string;
  prodi: string;
}

export interface UserCreate {
  role?: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  provider?: string;
  profile?: string;
  address?: string;
  phonenumber?: string;
  gender?: string;
  dateOfBirth?: string;
  forgotPassword?: string;
  resetPassword?: string;
  inovator?: {
    unit?: string;
    fields?: any[];
    itera_fakultas?: string;
    itera_prodi?: string;
  };
}
export interface UserUpdate {
  _id: string;
  role?: string;
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  provider?: string;
  profile?: string;
  address?: string;
  phonenumber?: string;
  gender?: string;
  dateOfBirth?: string;
  forgotPassword?: string;
  resetPassword?: string;
  inovator?: {
    unit?: string;
    fields?: any[];
    itera_fakultas?: string;
    itera_prodi?: string;
  };
}
