'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Product, PRODUCT_CATEGORIES, ProductCategory } from '@/types';
import { createProduct, updateProduct } from '@/lib/products';
import { validateEmail } from '@/lib/utils';

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    category: product?.category || PRODUCT_CATEGORIES[0],
    price: product?.price?.toString() || '',
    imageUrl: product?.imageUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Price must be a valid positive number';
      } else if (price > 10000) {
        newErrors.price = 'Price cannot exceed $10,000';
      }
    }

    // Image URL validation (optional but if provided, should be valid)
    if (formData.imageUrl && !isValidImageUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please provide a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setErrors({ submit: 'You must be logged in to create a product' });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as ProductCategory,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl.trim() || undefined,
        sellerId: user.id,
        sellerUsername: user.username,
        isAvailable: true,
      };

      if (isEditing && product) {
        await updateProduct(product.id, productData);
      } else {
        await createProduct(productData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      setErrors({
        submit: error.message || 'Failed to save product. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-[var(--color-text)] opacity-70 mb-4">
            You need to be logged in to create a product listing.
          </p>
          <Button onClick={() => router.push('/auth/signin')}>
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <Input
          label="Product Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Enter a descriptive title for your product"
          required
        />

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder:text-gray-500 transition-colors duration-200 resize-vertical"
            placeholder="Describe your product's condition, features, and any relevant details..."
            required
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors duration-200"
            required
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder:text-gray-500 transition-colors duration-200"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            Product Image URL (Optional)
          </label>
          <div className="relative">
            <ImagePlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder:text-gray-500 transition-colors duration-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {errors.imageUrl && (
            <p className="text-sm text-red-500">{errors.imageUrl}</p>
          )}
          <p className="text-xs text-[var(--color-text)] opacity-60">
            Provide a direct link to your product image (jpg, png, gif, webp)
          </p>
        </div>

        {/* Image Preview */}
        {formData.imageUrl && isValidImageUrl(formData.imageUrl) && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              Preview
            </label>
            <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-background)]">
              <img
                src={formData.imageUrl}
                alt="Product preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading 
              ? (isEditing ? 'Updating...' : 'Creating...') 
              : (isEditing ? 'Update Product' : 'Create Product')
            }
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};