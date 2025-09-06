'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { processCartCheckout } from '@/lib/purchases';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/signin?redirect=/cart');
      return;
    }

    if (items.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const purchaseIds = await processCartCheckout(user.id, items);
      clearCart();
      router.push('/dashboard/purchases');
    } catch (err: any) {
      setError(err.message || 'Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-[var(--color-text)] opacity-30 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display mb-4">
              Your cart is empty
            </h2>
            <p className="text-[var(--color-text)] opacity-70 mb-8 max-w-md mx-auto">
              Discover amazing sustainable products from our community of conscious sellers
            </p>
            <Link href="/marketplace">
              <Button size="lg">
                Browse Products
              </Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)] font-display">
              Shopping Cart
            </h1>
            <p className="text-[var(--color-text)] opacity-70">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] bg-opacity-10 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-[var(--color-primary)] opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-[var(--color-text)] font-display">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text)] opacity-70">
                          by {item.product.sellerUsername}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] rounded-full mt-1">
                          {item.product.category}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-[var(--color-text)] opacity-70 mb-4 line-clamp-2">
                      {item.product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium text-[var(--color-text)] w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[var(--color-primary)] font-display">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-sm text-[var(--color-text)] opacity-60">
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-[var(--color-text)] font-display mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[var(--color-text)] opacity-70">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="text-[var(--color-text)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[var(--color-text)] font-display">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[var(--color-primary)] font-display">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {user ? (
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-[var(--color-text)] opacity-70 text-center">
                    Sign in to complete your purchase
                  </p>
                  <Link href="/auth/signin?redirect=/cart">
                    <Button className="w-full" size="lg">
                      Sign In to Checkout
                    </Button>
                  </Link>
                </div>
              )}

              <div className="mt-4 text-xs text-[var(--color-text)] opacity-60 text-center">
                <p>🌱 Every purchase supports sustainable commerce</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}