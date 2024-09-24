export interface Category {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface Merchandise {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category_id: string;
  price: number;
  link_whatsapp: string;
  createdAt: string;
  updatedAt: string;
  categories: Category;
}
