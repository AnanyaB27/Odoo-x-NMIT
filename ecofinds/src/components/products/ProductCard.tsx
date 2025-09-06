'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, User, Calendar } from 'lucide-react';
import { Product } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice, formatRelativeTime } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  showSellerInfo?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  showSellerInfo = true,
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isOwnProduct = user?.id === product.sellerId;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.isAvailable && !isOwnProduct) {
      addToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <Card hover className="group overflow-hidden p-0">
      <div
        onClick={handleCardClick}
        className="cursor-pointer"
      >
        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] bg-opacity-10 overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-[var(--color-primary)] opacity-50 mx-auto mb-2" />
                <p className="text-sm text-[var(--color-text)] opacity-60">No image available</p>
              </div>
            </div>
          )}
          
          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.isAvailable
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {product.isAvailable ? 'Available' : 'Sold'}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement favorites functionality
            }}
            className="absolute top-3 left-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
          >
            <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--color-text)] font-display mb-2 line-clamp-2">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--color-text)] opacity-70 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-[var(--color-primary)] font-display">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center text-xs text-[var(--color-text)] opacity-60">
              <Calendar className="w-3 h-3 mr-1" />
              {formatRelativeTime(product.createdAt)}
            </div>
          </div>

          {/* Seller Info */}
          {showSellerInfo && (
            <div className="flex items-center mb-4 pb-4 border-b border-[var(--color-border)]">
              <div className="w-8 h-8 bg-[var(--color-accent)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {product.sellerUsername}
                </p>
                <p className="text-xs text-[var(--color-text)] opacity-60">
                  Seller
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {product.isAvailable && !isOwnProduct ? (
              <Button
                onClick={handleAddToCart}
                className="flex-1 group"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Add to Cart
              </Button>
            ) : isOwnProduct ? (
              <Link href={`/dashboard/products/${product.id}/edit`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Edit Product
                </Button>
              </Link>
            ) : (
              <Button disabled size="sm" className="flex-1">
                Sold Out
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleCardClick}
              className="px-4"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};