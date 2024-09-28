export interface RegisterSpecification {
  role: string;
  fullname: string;
  username: string;
  email: string;
  fakultas?: string;
  prodi?: string;
  "inovator.fakultas"?: string;
  "inovator.prodi"?: string;
  password: string;
  confirmPassword: string;
  phonenumber: string;
  dateOfBirth: string;
  gender: string;
}

export interface VerifyEmailSpecification {
  token: string;
}

export interface ResendEmailSpecification {
  email: string;
}

export interface ConfirmEmailSpecification {
  email: string;
  token: string;
}

export interface ForgotPasswordSpecification {
  email: string;
}

export interface ResetPasswordSpecification {
  token: string;
}

export interface LoginSpecification {
  email: string;
  password: string;
}

export interface GoogleSpecification {
  code: string;
}

export interface RefreshTokenSpecification {
  refreshToken: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  fullname: string;
}
