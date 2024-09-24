export interface Token {
  access: string;
  refresh: string;
}

export interface DecodedToken {
  exp: number;
  iat: number;
  user?: User | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'non-student' | 'admin';
  department_id: string | null;
  createdAt: string;
  updatedAt: string;
}
