import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { Purchase, Product } from '@/types';
import { updateProduct } from './products';

// Collection reference
const purchasesCollection = collection(db, 'purchases');

// Create a purchase
export async function createPurchase(
  buyerId: string,
  sellerId: string,
  product: Product
): Promise<string> {
  try {
    const batch = writeBatch(db);

    // Create purchase document
    const purchaseRef = doc(purchasesCollection);
    const purchaseData = {
      buyerId,
      sellerId,
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        imageUrl: product.imageUrl,
        sellerId: product.sellerId,
        sellerUsername: product.sellerUsername,
      },
      purchaseDate: Timestamp.now(),
      totalAmount: product.price,
    };

    batch.set(purchaseRef, purchaseData);

    // Mark product as unavailable
    const productRef = doc(db, 'products', product.id);
    batch.update(productRef, {
      isAvailable: false,
      updatedAt: Timestamp.now(),
    });

    await batch.commit();
    return purchaseRef.id;
  } catch (error) {
    console.error('Error creating purchase:', error);
    throw new Error('Failed to complete purchase');
  }
}

// Get purchases by buyer
export async function getPurchasesByBuyer(buyerId: string): Promise<Purchase[]> {
  try {
    const q = query(
      purchasesCollection,
      where('buyerId', '==', buyerId),
      orderBy('purchaseDate', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const purchases: Purchase[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      purchases.push({
        id: doc.id,
        ...data,
        purchaseDate: data.purchaseDate.toDate(),
        product: {
          ...data.product,
          createdAt: new Date(), // Default date since we don't store it in purchase
          updatedAt: new Date(),
          isAvailable: false,
        },
      } as Purchase);
    });

    return purchases;
  } catch (error) {
    console.error('Error getting purchases by buyer:', error);
    throw new Error('Failed to get purchase history');
  }
}

// Get purchases by seller (sales)
export async function getPurchasesBySeller(sellerId: string): Promise<Purchase[]> {
  try {
    const q = query(
      purchasesCollection,
      where('sellerId', '==', sellerId),
      orderBy('purchaseDate', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const purchases: Purchase[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      purchases.push({
        id: doc.id,
        ...data,
        purchaseDate: data.purchaseDate.toDate(),
        product: {
          ...data.product,
          createdAt: new Date(),
          updatedAt: new Date(),
          isAvailable: false,
        },
      } as Purchase);
    });

    return purchases;
  } catch (error) {
    console.error('Error getting purchases by seller:', error);
    throw new Error('Failed to get sales history');
  }
}

// Process cart checkout (multiple items)
export async function processCartCheckout(
  buyerId: string,
  cartItems: { product: Product; quantity: number }[]
): Promise<string[]> {
  try {
    const purchaseIds: string[] = [];

    // Process each item in the cart
    for (const item of cartItems) {
      for (let i = 0; i < item.quantity; i++) {
        const purchaseId = await createPurchase(
          buyerId,
          item.product.sellerId,
          item.product
        );
        purchaseIds.push(purchaseId);
      }
    }

    return purchaseIds;
  } catch (error) {
    console.error('Error processing cart checkout:', error);
    throw new Error('Failed to process checkout');
  }
}