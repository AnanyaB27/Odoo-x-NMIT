import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, ProductCategory } from '@/types';

// Collection reference
const productsCollection = collection(db, 'products');

// Create a new product
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(productsCollection, {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

// Get a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw new Error('Failed to get product');
  }
}

// Get all products with optional filtering and pagination
export async function getProducts(options: {
  category?: ProductCategory;
  searchQuery?: string;
  sellerId?: string;
  limitCount?: number;
  lastDoc?: DocumentSnapshot;
  isAvailable?: boolean;
} = {}): Promise<{ products: Product[]; lastDoc: DocumentSnapshot | null }> {
  try {
    let q = query(productsCollection);

    // Add filters
    if (options.category) {
      q = query(q, where('category', '==', options.category));
    }

    if (options.sellerId) {
      q = query(q, where('sellerId', '==', options.sellerId));
    }

    if (options.isAvailable !== undefined) {
      q = query(q, where('isAvailable', '==', options.isAvailable));
    }

    // Add search functionality (simple title search)
    if (options.searchQuery) {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple implementation that searches for exact matches
      // In a production app, you'd want to use Algolia or similar
      const searchLower = options.searchQuery.toLowerCase();
      q = query(q, where('title', '>=', searchLower), where('title', '<=', searchLower + '\uf8ff'));
    }

    // Add ordering
    q = query(q, orderBy('createdAt', 'desc'));

    // Add pagination
    if (options.lastDoc) {
      q = query(q, startAfter(options.lastDoc));
    }

    if (options.limitCount) {
      q = query(q, limit(options.limitCount));
    }

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    let lastDoc: DocumentSnapshot | null = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Product);
      lastDoc = doc;
    });

    // Client-side search fallback for better search experience
    let filteredProducts = products;
    if (options.searchQuery && !options.category) {
      const searchLower = options.searchQuery.toLowerCase();
      filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    return {
      products: filteredProducts,
      lastDoc: filteredProducts.length > 0 ? lastDoc : null,
    };
  } catch (error) {
    console.error('Error getting products:', error);
    throw new Error('Failed to get products');
  }
}

// Update a product
export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

// Delete a product
export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

// Get products by seller
export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const { products } = await getProducts({ sellerId });
  return products;
}

// Search products
export async function searchProducts(searchQuery: string, category?: ProductCategory): Promise<Product[]> {
  const { products } = await getProducts({ searchQuery, category });
  return products;
}