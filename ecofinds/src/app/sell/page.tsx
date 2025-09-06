'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductForm } from '@/components/products/ProductForm';
import { Card } from '@/components/ui/Card';
import { Leaf, DollarSign, Users, Recycle } from 'lucide-react';

export default function SellPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] bg-opacity-10 rounded-2xl mb-6">
            <Leaf className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display mb-4">
            List Your Product
          </h1>
          <p className="text-xl text-[var(--color-text)] opacity-70 max-w-2xl mx-auto">
            Give your pre-loved items a new life and earn money while contributing to a sustainable future
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] font-display mb-2">
              Earn Money
            </h3>
            <p className="text-sm text-[var(--color-text)] opacity-70">
              Turn your unused items into cash and declutter your space
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-[var(--color-accent)] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Recycle className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] font-display mb-2">
              Reduce Waste
            </h3>
            <p className="text-sm text-[var(--color-text)] opacity-70">
              Keep items out of landfills and support circular economy
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-[var(--color-primary)] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-text)] font-display mb-2">
              Help Others
            </h3>
            <p className="text-sm text-[var(--color-text)] opacity-70">
              Provide affordable options for conscious consumers
            </p>
          </Card>
        </div>

        {/* Selling Tips */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-[var(--color-accent)] bg-opacity-5 to-[var(--color-primary)] bg-opacity-5">
          <h2 className="text-xl font-semibold text-[var(--color-text)] font-display mb-4">
            💡 Tips for a Great Listing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--color-text)] opacity-80">
            <ul className="space-y-2">
              <li>• Use clear, well-lit photos</li>
              <li>• Write detailed, honest descriptions</li>
              <li>• Set competitive pricing</li>
            </ul>
            <ul className="space-y-2">
              <li>• Mention any flaws or wear</li>
              <li>• Choose the right category</li>
              <li>• Respond quickly to interested buyers</li>
            </ul>
          </div>
        </Card>

        {/* Product Form */}
        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] font-display mb-6">
            Product Information
          </h2>
          <ProductForm />
        </div>
      </div>
    </Layout>
  );
}