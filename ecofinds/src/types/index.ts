export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
  sellerId: string;
  sellerUsername: string;
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  buyerId: string;
  sellerId: string;
  product: Product;
  purchaseDate: Date;
  totalAmount: number;
}

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing & Fashion',
  'Home & Garden',
  'Books & Media',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Art & Crafts',
  'Other'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];