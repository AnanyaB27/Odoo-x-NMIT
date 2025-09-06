'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Heart, Recycle, Shield, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-card)] border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-[var(--color-primary)] rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--color-text)] font-display">
                EcoFinds
              </span>
            </div>
            <p className="text-[var(--color-text)] opacity-80 mb-6 max-w-md">
              The Digital Greenhouse where pre-loved products get a new life. 
              Join our community of conscious consumers building a sustainable future.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-[var(--color-accent)]">
                <Recycle className="w-5 h-5" />
                <span className="text-sm font-medium">Sustainable</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-accent)]">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Trusted</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--color-accent)]">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Community</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[var(--color-text)] mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/marketplace" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/sell" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Start Selling
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-[var(--color-text)] mb-4 font-display">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/help" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  href="/safety" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[var(--color-text)] opacity-60 text-sm">
            © 2024 EcoFinds. Made with{' '}
            <Heart className="w-4 h-4 inline text-red-500" />{' '}
            for a sustainable future.
          </p>
          <p className="text-[var(--color-text)] opacity-60 text-sm mt-2 sm:mt-0">
            Built for the hackathon with care and attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
};