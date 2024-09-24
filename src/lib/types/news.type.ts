import { Category } from './merchendase.type';
import { User } from './models.type';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author_id: string;
  category_id: string;

  slug: string;

  createdAt: string;
  updatedAt: string;

  // relation
  author: User;
  categories: Category;
}
