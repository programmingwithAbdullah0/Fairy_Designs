// Shared TypeScript interfaces for Products and Categories

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  priceMin: number;
  priceMax: number;
  description: string;
  category?: Category;
}

export interface ProductWithCategory extends Product {
  category: Category;
}
