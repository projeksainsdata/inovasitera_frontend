export interface InovationResponse {
  requestId: string;
  requestTime: Date;
  data: Inovation[];
  pagination: Pagination;
}

export interface Inovation {
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
