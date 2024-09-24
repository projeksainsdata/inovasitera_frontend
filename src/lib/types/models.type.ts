export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  department?: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string;
}

export interface UserAction {
  type: string;
  payload?: any;
}

export interface UserUpdate {
  id: number;
  username?: string;
  email?: string;
  role?: string;
  department?: string;
}

export interface UserCreate {
  username: string;
  email: string;
  role: string;
  department: string;
}

export interface UserDelete {
  id: number;
}

export interface UserFilter {
  role?: string;
  department?: string;
  username?: string;
  email?: string;
}

export interface Department {
  id: string;
  name: string;
  department_type: string;
  description: string;
  logo: string;
  short_name: string;
  member?: Member[];
  division?: Division[];
}

export interface Content {
  id: string;
  title: string;
  content: string;
  image: string;
  link_ig: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentCreate {
  title: string;
  content: string;
  image: string | File;
  link_ig: string;
}

export interface ContentUpdate {
  id: string;
  title?: string;
  content?: string;
  image?: string | File;
  link_ig?: string;
}

export interface Artikel {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author_id: string;
  categories: Categories;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
}

export interface ArtikelCreate {
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category_id: string;
}

export interface ArtikelUpdate {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: string | File;
  category_id?: string;
}

export interface Categories {
  id: string;
  name: string;
  description: string;

  type: string;
}

export interface Merchant {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  link_whatsapp?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MerchantCreate {
  title: string;
  description: string;
  thumbnail: string | File;
  category: string;
  price: number;
  link_whatsapp?: string;
}

export interface MerchantUpdate {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: string | File;
  category?: string;
  price?: number;
  link_whatsapp?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link_ig: string;
  date_start: Date;
  date_end: Date;
  author: User;
  categories: Categories;
}

export interface EventCreate {
  title: string;
  description: string;
  thumbnail: string | File;
  link_ig: string;
  date_start?: Date;
  date_end?: Date;
  time: Date[];
  category_id?: string;
}

export interface EventUpdate {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: string | File;
  link_ig?: string;
  date_start?: Date;
  date_end?: Date;
  time?: Date[];
  category_id?: string;
}

export interface Member {
  id: string;
  name: string;
  department_id: string;
  position: string;
  link_ig?: string;
  link_linkedin?: string;
  motto?: string;
  photo: string;
  year: number;
  division?: Division | null;
}

export interface MemberCreate {
  name: string;
  department_id: string;
  position: string;
  link_ig?: string;
  link_linkedin?: string;
  motto?: string;
  photo?: string | File;
  year: number;
  division_id: string;
}

export interface MemberUpdate {
  id: string;
  name?: string;
  department_id?: string;
  position?: string;
  link_ig?: string;
  link_linkedin?: string;
  motto?: string;
  photo?: string | File;
  year?: number;
  division_id?: string;
}

export interface Portofolio {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  category: string;
  link_project: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortofolioCreate {
  title: string;
  description?: string;
  thumbnail?: string | File;
  category: string;
  link_project: string;
}

export interface PortofolioUpdate {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: string | File;
  category?: string;
  link_project?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  year?: number;
  short_name: string;
  logo: string;
  department_type: string;
  member?: Member[];
  division?: Division[];
}

export interface DepartmentCreate {
  name: string;
  description: string;
  year: number;
  short_name: string;
  logo: string | File;
  department_type: string;
}

export interface DepartmentUpdate {
  id: string;
  name?: string;
  description?: string;
  year?: number;
  short_name?: string;
  logo?: string | File;
  department_type?: string;
}

export interface Categories {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface CategoriesCreate {
  name: string;
  description: string;
  type: string;
}

export interface CategoriesUpdate {
  id: string;
  name?: string;
  description?: string;
  type?: string;
}

export interface DashboardData {
  user: {
    userGrowth: { _count: { id: number }; createdAt: string }[];
    roleDistribution: { _count: { id: number }; role: string }[];
    departmentDistribution: { _count: { id: number }; department_id: string }[];
  };
  article: {
    totalArticles: number;
    popularCategories: { name: string; _count: { artikel: number } }[];
    topAuthors: { username: string; _count: { artikel: number } }[];
  };
  event: {
    totalEvents: number;
    upcomingEvents: number;
    ongoingEvents: number;
    pastEvents: number;
  };
  merchant: {
    totalMerchants: number;
    merchantGrowth: { _count: { id: number }; createdAt: string }[];
  };
  member: {
    totalMembers: number;
    positionDistribution: { _count: { id: number }; position: string }[];
  };
  portfolio: {
    totalPortfolios: number;
  };
}

export interface Division {
  id: string;
  name: string;
  department_id: string;
}

export interface DivisionCreate {
  name: string;
  department_id: string;
}

export interface DivisionUpdate {
  id: string;
  name?: string;
  department_id?: string;
}

export interface Kepengurusan {
  id: string;
  year: number;
  department: Department;
}

export interface KepengurusanCreate {
  year: number;
}

export interface KepengurusanUpdate {
  id: string;
  year?: number;
}
