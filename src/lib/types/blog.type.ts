export interface BlogCategoryType {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface BlogAuthorType {
  _id: string;
  fullname: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt?: string;
  category: BlogCategoryType;
  user: BlogAuthorType;
}

export interface BlogFormData {
  title: string;
  slug?: string;
  thumbnail: string | File;
  description: string;
  content: string;
  categoryName: string;
  status: 'draft' | 'published';
}