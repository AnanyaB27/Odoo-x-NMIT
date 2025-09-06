/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'forest-green': '#2F4F4F',
        'sand-beige': '#F8F7F3',
        'leaf-green': '#84A98C',
        'charcoal-black': '#333333',
        
        // Dark mode colors
        'mint-green': '#66CDAA',
        'charcoal-dark': '#1A202C',
        'sage-green': '#8FBC8F',
        'off-white': '#E2E8F0',
        
        // Semantic colors
        primary: {
          light: '#2F4F4F', // forest-green for light mode
          dark: '#66CDAA',  // mint-green for dark mode
        },
        background: {
          light: '#F8F7F3', // sand-beige for light mode
          dark: '#1A202C',  // charcoal-dark for dark mode
        },
        accent: {
          light: '#84A98C', // leaf-green for light mode
          dark: '#8FBC8F',  // sage-green for dark mode
        },
        text: {
          light: '#333333', // charcoal-black for light mode
          dark: '#E2E8F0',  // off-white for dark mode
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-dark': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}