export interface CategoriesHome {
  name: string;
}
export interface ContentHome {
  link_ig: string;
  content: string;
  image: string;
  title: string;
}

export interface ArtikelHome {
  slug: string;
  description: string;
  createdAt: string;
  categories: CategoriesHome;
  thumbnail: string;
  title: string;
}

export interface EventHome {
  id: string;
  title: string;
  thumbnail: string;
  categories: CategoriesHome;
}

export interface MerchantHome {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

export interface BphHome {
  id: string;
  department_type: string;
  name: string;
  description: string;
  logo: string;
  short_name: string;
}

export interface Homepages {
  content: ContentHome[];
  Artikels: ArtikelHome[];
  Events: EventHome[];
  Bph: BphHome[];
  Merchant: MerchantHome[];
}
