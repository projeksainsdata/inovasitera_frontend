export interface InovationResponse {
  requestId: string;
  requestTime: Date;
  data: Inovation[];
  pagination: Pagination;
}

export interface Inovation {
  status: string;
  _id: string;
  title: string;
  category: Category;
  image: string;
  average_rating: number;
  count_rating: number;
}

export interface Category {
  name: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

export interface InovationSchema {
  _id: string;
  title: string;
  description: string;
  category: string;
  user_id: string;
  status: string;
  thun: string;
  adventage: string;
  status_paten: string;
  score_tkt: string;
  collaboration: string[];
  collaboration_details: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface InovationUpdateSchema {
  _id: any;
  title: string;
  description: string;
  category: string;
  user_id: string;
  status?: string;
  Image: string;
  adventage?: string;
  status_paten?: string;
  score_tkt?: string;
  invesment_value?: string;
  collaboration?: string[];
  collaboration_details?: string;
}

export interface InovationCreateSchema {
  _id: any;
  title: string;
  description: string;
  category: string;
  user_id: string;
  status?: string;
  Image: string;
  adventage?: string;
  status_paten?: string;
  score_tkt?: string;
  invesment_value?: string;
  collaboration?: string[];
  collaboration_details?: string;
}

export interface InovationManageSchema {
  status: string;
}
