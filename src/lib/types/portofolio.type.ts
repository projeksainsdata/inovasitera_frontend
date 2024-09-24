export interface Portofolio {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  categories: {
    id: number;
    name: string;
  };
  link_project: string;
  createdAt: string;
  updatedAt: string;
}
