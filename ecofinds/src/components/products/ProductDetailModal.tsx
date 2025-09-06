'use client';

import React from 'react';
import { ShoppingCart, User, Calendar, Tag, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice, formatRelativeTime } from '@/lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!product) return null;

  const isOwnProduct = user?.id === product.sellerId;

  const handleAddToCart = () => {
    if (product.isAvailable && !isOwnProduct) {
      addToCart(product);
      // Optional: Show success message or close modal
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Optional: Show copied message
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Details"
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] bg-opacity-10 rounded-2xl overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 text-[var(--color-primary)] opacity-50 mx-auto mb-4" />
                  <p className="text-[var(--color-text)] opacity-60">No image available</p>
                </div>
              </div>
            )}

            {/* Availability Badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.isAvailable
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {product.isAvailable ? 'Available' : 'Sold'}
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO: Implement favorites
              }}
              className="flex-1"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[var(--color-text)] font-display">
            {product.title}
          </h2>

          {/* Price */}
          <div className="text-3xl font-bold text-[var(--color-primary)] font-display">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] font-display mb-3">
              Description
            </h3>
            <p className="text-[var(--color-text)] opacity-80 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          {/* Seller Information */}
          <div className="p-4 bg-[var(--color-background)] rounded-xl border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-text)] font-display mb-3">
              Seller Information
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[var(--color-accent)] bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--color-text)]">
                  {product.sellerUsername}
                </p>
                <div className="flex items-center text-sm text-[var(--color-text)] opacity-60">
                  <Calendar className="w-3 h-3 mr-1" />
                  Listed {formatRelativeTime(product.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--color-text)] font-display">
              Product Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[var(--color-text)] opacity-60">Category:</span>
                <p className="font-medium text-[var(--color-text)]">{product.category}</p>
              </div>
              <div>
                <span className="text-[var(--color-text)] opacity-60">Status:</span>
                <p className="font-medium text-[var(--color-text)]">
                  {product.isAvailable ? 'Available' : 'Sold'}
                </p>
              </div>
              <div>
                <span className="text-[var(--color-text)] opacity-60">Listed:</span>
                <p className="font-medium text-[var(--color-text)]">
                  {formatRelativeTime(product.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-[var(--color-text)] opacity-60">Updated:</span>
                <p className="font-medium text-[var(--color-text)]">
                  {formatRelativeTime(product.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
            {product.isAvailable && !isOwnProduct ? (
              <Button
                onClick={handleAddToCart}
                className="w-full group"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Add to Cart
              </Button>
            ) : isOwnProduct ? (
              <div className="space-y-2">
                <Button variant="outline" className="w-full" size="lg">
                  Edit Product
                </Button>
                <p className="text-center text-sm text-[var(--color-text)] opacity-60">
                  This is your product listing
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Button disabled className="w-full" size="lg">
                  Sold Out
                </Button>
                <p className="text-center text-sm text-[var(--color-text)] opacity-60">
                  This product is no longer available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};