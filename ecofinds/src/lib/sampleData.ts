import { Product, PRODUCT_CATEGORIES } from '@/types';

// Sample product data for testing and demonstration
export const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "Vintage Leather Jacket",
    description: "Classic brown leather jacket in excellent condition. Worn only a few times. Perfect for sustainable fashion lovers. Size M, genuine leather with soft lining.",
    category: "Clothing & Fashion",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    sellerId: "sample-seller-1",
    sellerUsername: "EcoFashionista",
    isAvailable: true,
  },
  {
    title: "iPhone 12 Pro - Unlocked",
    description: "iPhone 12 Pro in Space Gray, 128GB. Battery health at 87%. Includes original box and charger. Minor scratches on the back, screen is pristine.",
    category: "Electronics",
    price: 449.99,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    sellerId: "sample-seller-2",
    sellerUsername: "TechSaver",
    isAvailable: true,
  },
  {
    title: "Handmade Ceramic Vase Set",
    description: "Beautiful set of 3 ceramic vases in earth tones. Hand-thrown by local artisan. Perfect for dried flowers or as decorative pieces. Each piece is unique.",
    category: "Home & Garden",
    price: 35.00,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    sellerId: "sample-seller-3",
    sellerUsername: "ArtisanCrafter",
    isAvailable: true,
  },
  {
    title: "The Complete Harry Potter Book Series",
    description: "Complete set of Harry Potter books 1-7 in hardcover. All books in great condition with minimal wear. Perfect for collectors or new readers.",
    category: "Books & Media",
    price: 125.00,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
    sellerId: "sample-seller-4",
    sellerUsername: "BookLover92",
    isAvailable: true,
  },
  {
    title: "Yoga Mat & Block Set",
    description: "High-quality yoga mat (6mm thick) with matching yoga block. Barely used, excellent for beginners or experienced yogis. Non-slip surface, easy to clean.",
    category: "Sports & Outdoors",
    price: 28.50,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    sellerId: "sample-seller-5",
    sellerUsername: "ZenMaster",
    isAvailable: true,
  },
  {
    title: "LEGO Architecture Statue of Liberty",
    description: "LEGO Architecture set #21042 - Statue of Liberty. Complete set with all pieces and instruction manual. Built once and displayed, then carefully disassembled.",
    category: "Toys & Games",
    price: 75.00,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    sellerId: "sample-seller-6",
    sellerUsername: "BrickBuilder",
    isAvailable: true,
  },
  {
    title: "Organic Skincare Gift Set",
    description: "Unopened organic skincare set including cleanser, toner, and moisturizer. All natural ingredients, suitable for sensitive skin. Expiry date: 2025.",
    category: "Health & Beauty",
    price: 42.00,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    sellerId: "sample-seller-7",
    sellerUsername: "NaturalBeauty",
    isAvailable: true,
  },
  {
    title: "Car Phone Mount - Magnetic",
    description: "Universal magnetic car phone mount. Strong magnets, 360-degree rotation. Compatible with most smartphones. Barely used, includes adhesive metal plates.",
    category: "Automotive",
    price: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop",
    sellerId: "sample-seller-8",
    sellerUsername: "CarTechGuru",
    isAvailable: true,
  },
  {
    title: "Watercolor Paint Set - Professional",
    description: "Professional watercolor paint set with 24 colors, brushes, and watercolor paper pad. Barely used, perfect for artists or hobbyists. High pigment quality.",
    category: "Art & Crafts",
    price: 67.50,
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
    sellerId: "sample-seller-9",
    sellerUsername: "ArtisticSoul",
    isAvailable: true,
  },
  {
    title: "Vintage Polaroid Camera",
    description: "Working vintage Polaroid camera from the 1980s. Comes with 2 packs of film. Great for instant photography enthusiasts. Some cosmetic wear but fully functional.",
    category: "Other",
    price: 95.00,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    sellerId: "sample-seller-10",
    sellerUsername: "VintageCollector",
    isAvailable: true,
  },
  {
    title: "Bamboo Kitchen Utensil Set",
    description: "Eco-friendly bamboo kitchen utensil set with 6 pieces including spatula, spoons, and tongs. Sustainable alternative to plastic. Like new condition.",
    category: "Home & Garden",
    price: 22.99,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
    sellerId: "sample-seller-11",
    sellerUsername: "EcoKitchen",
    isAvailable: true,
  },
  {
    title: "Designer Silk Scarf",
    description: "Authentic designer silk scarf in beautiful floral pattern. 100% silk, hand-rolled edges. Perfect condition, stored carefully. A timeless accessory piece.",
    category: "Clothing & Fashion",
    price: 78.00,
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
    sellerId: "sample-seller-1",
    sellerUsername: "EcoFashionista",
    isAvailable: true,
  },
];

// Function to get random sample products
export const getRandomSampleProducts = (count: number = 6): typeof sampleProducts => {
  const shuffled = [...sampleProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get products by category
export const getSampleProductsByCategory = (category: string): typeof sampleProducts => {
  return sampleProducts.filter(product => product.category === category);
};