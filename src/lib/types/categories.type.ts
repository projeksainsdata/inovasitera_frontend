export interface Category {
  name: string;
  description: string;
  image: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Categories {
  name: string;
  image: string;
  _id: string;
}
export interface CategoriesCreate {
  name: string;
  description: string;
  image: string;
}
export interface CategoriesUpdate {
  _id: string;
  name: string;
  description: string;
  image: string;
}
