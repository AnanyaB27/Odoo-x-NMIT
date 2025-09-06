'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, ShoppingBag, Users, Recycle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { GSAPWrapper, StaggerWrapper } from '@/components/animations/GSAPWrapper';
import { PageTransition } from '@/components/animations/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Layout>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-background)] to-[var(--color-accent)] bg-opacity-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <GSAPWrapper animation="slideInLeft" duration={0.8}>
                <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-text)] font-display leading-tight mb-6">
                  Welcome to the
                  <span className="block text-[var(--color-primary)]">
                    Digital Greenhouse
                  </span>
                </h1>
                <p className="text-xl text-[var(--color-text)] opacity-80 mb-8 leading-relaxed">
                  Where pre-loved products get a new life. Join our community of conscious consumers 
                  building a sustainable future, one purchase at a time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/marketplace">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Explore Products
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Join the Community
                    </Button>
                  </Link>
                </div>
              </GSAPWrapper>
              
              {/* Hero Image/Illustration */}
              <GSAPWrapper animation="slideInRight" duration={0.8} delay={0.2}>
                <div className="bg-[var(--color-card)] rounded-3xl p-8 shadow-soft">
                  <StaggerWrapper staggerDelay={0.1} animation="scaleIn" className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-primary)] bg-opacity-10 rounded-2xl p-6 flex flex-col items-center text-center">
                      <Leaf className="w-12 h-12 text-[var(--color-primary)] mb-3" />
                      <h3 className="font-semibold text-[var(--color-text)] font-display">Sustainable</h3>
                      <p className="text-sm text-[var(--color-text)] opacity-70">Eco-friendly choices</p>
                    </div>
                    <div className="bg-[var(--color-accent)] bg-opacity-10 rounded-2xl p-6 flex flex-col items-center text-center">
                      <ShoppingBag className="w-12 h-12 text-[var(--color-accent)] mb-3" />
                      <h3 className="font-semibold text-[var(--color-text)] font-display">Quality</h3>
                      <p className="text-sm text-[var(--color-text)] opacity-70">Curated products</p>
                    </div>
                    <div className="bg-[var(--color-accent)] bg-opacity-10 rounded-2xl p-6 flex flex-col items-center text-center">
                      <Users className="w-12 h-12 text-[var(--color-accent)] mb-3" />
                      <h3 className="font-semibold text-[var(--color-text)] font-display">Community</h3>
                      <p className="text-sm text-[var(--color-text)] opacity-70">Trusted sellers</p>
                    </div>
                    <div className="bg-[var(--color-primary)] bg-opacity-10 rounded-2xl p-6 flex flex-col items-center text-center">
                      <Recycle className="w-12 h-12 text-[var(--color-primary)] mb-3" />
                      <h3 className="font-semibold text-[var(--color-text)] font-display">Impact</h3>
                      <p className="text-sm text-[var(--color-text)] opacity-70">Reduce waste</p>
                    </div>
                  </StaggerWrapper>
                </div>
              </GSAPWrapper>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[var(--color-card)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GSAPWrapper animation="slideUp" trigger className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] font-display mb-4">
                Why Choose EcoFinds?
              </h2>
              <p className="text-xl text-[var(--color-text)] opacity-70 max-w-3xl mx-auto">
                More than just a marketplace - we're building a sustainable future together
              </p>
            </GSAPWrapper>

            <StaggerWrapper 
              staggerDelay={0.2} 
              animation="slideUp" 
              trigger 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <Card hover className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-4">
                  Eco-Conscious
                </h3>
                <p className="text-[var(--color-text)] opacity-70 leading-relaxed">
                  Every purchase helps reduce waste and supports a circular economy. 
                  Make a positive impact with every buy.
                </p>
              </Card>

              <Card hover className="text-center">
                <div className="w-16 h-16 bg-[var(--color-accent)] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-4">
                  Trusted Community
                </h3>
                <p className="text-[var(--color-text)] opacity-70 leading-relaxed">
                  Connect with verified sellers and buyers in a safe, 
                  supportive environment built on trust and transparency.
                </p>
              </Card>

              <Card hover className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] font-display mb-4">
                  Quality First
                </h3>
                <p className="text-[var(--color-text)] opacity-70 leading-relaxed">
                  Carefully curated products that meet our quality standards. 
                  Find unique, well-maintained items at great prices.
                </p>
              </Card>
            </StaggerWrapper>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <GSAPWrapper animation="slideUp" trigger>
              <h2 className="text-3xl lg:text-4xl font-bold text-white font-display mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
                Join thousands of eco-conscious shoppers and sellers creating positive change. 
                Start your sustainable journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full sm:w-auto bg-white text-[var(--color-primary)] hover:bg-gray-100"
                  >
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
                  >
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </GSAPWrapper>
          </div>
        </section>
      </Layout>
    </PageTransition>
  );
}
