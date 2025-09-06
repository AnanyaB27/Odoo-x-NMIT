'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  ShoppingBag, 
  Plus, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { useAuth } from '@/contexts/AuthContext';
import { Product, Purchase } from '@/types';
import { getProductsBySeller, deleteProduct } from '@/lib/products';
import { getPurchasesByBuyer, getPurchasesBySeller } from '@/lib/purchases';
import { formatPrice } from '@/lib/utils';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [sales, setSales] = useState<Purchase[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'purchases' | 'sales'>('overview');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [productsData, purchasesData, salesData] = await Promise.all([
        getProductsBySeller(user.id),
        getPurchasesByBuyer(user.id),
        getPurchasesBySeller(user.id),
      ]);

      setUserProducts(productsData);
      setPurchases(purchasesData);
      setSales(salesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteProduct(productId);
      setUserProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const totalEarnings = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  const availableProducts = userProducts.filter(p => p.isAvailable).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] font-display mb-2">
              Welcome back, {user.username}!
            </h1>
            <p className="text-[var(--color-text)] opacity-70">
              Manage your products and track your sustainable commerce activity
            </p>
          </div>
          <Link href="/sell">
            <Button className="mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              List New Product
            </Button>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--color-border)]">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'products', label: 'My Products', icon: Package },
            { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
            { id: 'sales', label: 'Sales', icon: DollarSign },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors duration-200 ${
                activeTab === id
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text)] opacity-70 hover:opacity-100'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text)] opacity-70">Products Listed</p>
                    <p className="text-2xl font-bold text-[var(--color-text)] font-display">
                      {userProducts.length}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text)] opacity-70">Available</p>
                    <p className="text-2xl font-bold text-[var(--color-text)] font-display">
                      {availableProducts}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-[var(--color-accent)]" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text)] opacity-70">Total Earned</p>
                    <p className="text-2xl font-bold text-[var(--color-text)] font-display">
                      {formatPrice(totalEarnings)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text)] opacity-70">Total Spent</p>
                    <p className="text-2xl font-bold text-[var(--color-text)] font-display">
                      {formatPrice(totalSpent)}
                    </p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
              </Card>
            </div>

            {/* Recent Products */}
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display mb-6">
                Recent Products
              </h2>
              {userProducts.length === 0 ? (
                <Card className="p-8 text-center">
                  <Package className="w-16 h-16 text-[var(--color-text)] opacity-30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-2">
                    No products yet
                  </h3>
                  <p className="text-[var(--color-text)] opacity-70 mb-6">
                    Start selling by listing your first product
                  </p>
                  <Link href="/sell">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Product
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProducts.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={setSelectedProduct}
                      showSellerInfo={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display">
                My Products ({userProducts.length})
              </h2>
              <Link href="/sell">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>

            {userProducts.length === 0 ? (
              <Card className="p-8 text-center">
                <Package className="w-16 h-16 text-[var(--color-text)] opacity-30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-2">
                  No products listed
                </h3>
                <p className="text-[var(--color-text)] opacity-70 mb-6">
                  Start earning by listing your first product
                </p>
                <Link href="/sell">
                  <Button>List Your First Product</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      product={product}
                      onProductClick={setSelectedProduct}
                      showSellerInfo={false}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm" className="p-2 bg-white dark:bg-gray-800 shadow-md">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-white dark:bg-gray-800 shadow-md text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display mb-6">
              My Purchases ({purchases.length})
            </h2>

            {purchases.length === 0 ? (
              <Card className="p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-[var(--color-text)] opacity-30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-2">
                  No purchases yet
                </h3>
                <p className="text-[var(--color-text)] opacity-70 mb-6">
                  Explore our marketplace to find sustainable products
                </p>
                <Link href="/marketplace">
                  <Button>Browse Products</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] bg-opacity-10 rounded-lg overflow-hidden">
                        {purchase.product.imageUrl ? (
                          <img
                            src={purchase.product.imageUrl}
                            alt={purchase.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-[var(--color-primary)] opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text)] font-display">
                          {purchase.product.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text)] opacity-70">
                          Purchased from {purchase.product.sellerUsername}
                        </p>
                        <p className="text-xs text-[var(--color-text)] opacity-60">
                          {purchase.purchaseDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[var(--color-primary)] font-display">
                          {formatPrice(purchase.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display mb-6">
              My Sales ({sales.length})
            </h2>

            {sales.length === 0 ? (
              <Card className="p-8 text-center">
                <DollarSign className="w-16 h-16 text-[var(--color-text)] opacity-30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-2">
                  No sales yet
                </h3>
                <p className="text-[var(--color-text)] opacity-70 mb-6">
                  List products to start earning from your items
                </p>
                <Link href="/sell">
                  <Button>List a Product</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {sales.map((sale) => (
                  <Card key={sale.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] bg-opacity-10 rounded-lg overflow-hidden">
                        {sale.product.imageUrl ? (
                          <img
                            src={sale.product.imageUrl}
                            alt={sale.product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-[var(--color-primary)] opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--color-text)] font-display">
                          {sale.product.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text)] opacity-70">
                          Sold to buyer
                        </p>
                        <p className="text-xs text-[var(--color-text)] opacity-60">
                          {sale.purchaseDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-500 font-display">
                          +{formatPrice(sale.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </Layout>
  );
}