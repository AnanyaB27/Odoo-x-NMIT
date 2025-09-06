# EcoFinds - The Digital Greenhouse 🌱

A premium sustainable marketplace where pre-loved products get a new life. Built with Next.js, TypeScript, Firebase, and beautiful animations.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure email/password authentication with Firebase Auth
- **Product Management**: Full CRUD operations for product listings
- **Marketplace Browsing**: Grid/list view with advanced filtering and search
- **Shopping Cart**: Add/remove items with persistent storage
- **Purchase System**: Complete checkout process with purchase history
- **User Dashboard**: Profile management and product/sales tracking

### Design & UX
- **Responsive Design**: Works beautifully on all device sizes
- **Light/Dark Mode**: Toggle between premium color schemes
- **GSAP Animations**: Smooth page transitions and micro-interactions
- **Modern UI**: Clean, minimalist design inspired by nature
- **Accessibility**: Proper contrast ratios and keyboard navigation

### Technical Features
- **Real-time Database**: Firebase Firestore for live data updates
- **Form Validation**: Robust input validation with error handling
- **Image Support**: Product image URLs with fallback placeholders
- **Search & Filter**: Category filtering and keyword search
- **State Management**: React Context for auth, cart, and theme

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofinds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   # Update .env.local with your Firebase config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette

#### Light Mode
- **Primary**: Forest Green (#2F4F4F)
- **Background**: Sand Beige (#F8F7F3)
- **Accent**: Leaf Green (#84A98C)
- **Text**: Charcoal Black (#333333)

#### Dark Mode
- **Primary**: Mint Green (#66CDAA)
- **Background**: Charcoal (#1A202C)
- **Accent**: Sage Green (#8FBC8F)
- **Text**: Off-White (#E2E8F0)

### Typography
- **Headlines**: Playfair Display (serif)
- **Body & UI**: Poppins (sans-serif)

## 📱 Pages & Routes

- `/` - Landing page with hero section and features
- `/marketplace` - Browse all products with filtering
- `/sell` - Create new product listings
- `/cart` - Shopping cart and checkout
- `/dashboard` - User dashboard with products and purchases
- `/auth/signin` - User sign in
- `/auth/signup` - User registration

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Animations**: GSAP, ScrollTrigger
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod validation

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── marketplace/       # Product browsing
│   ├── dashboard/         # User dashboard
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   └── animations/       # GSAP animation wrappers
├── contexts/             # React contexts
├── lib/                  # Utility functions and services
├── types/                # TypeScript type definitions
└── ...
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components
- **ProductCard**: Displays product information with actions
- **ProductForm**: Create/edit product listings
- **ProductDetailModal**: Detailed product view
- **GSAPWrapper**: Animation wrapper for smooth transitions
- **Layout**: Main layout with header and footer

## 🌍 Environment Variables

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 📊 Database Schema

### Users Collection
```typescript
{
  id: string,
  email: string,
  username: string,
  createdAt: Date
}
```

### Products Collection
```typescript
{
  id: string,
  title: string,
  description: string,
  category: string,
  price: number,
  imageUrl?: string,
  sellerId: string,
  sellerUsername: string,
  isAvailable: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Purchases Collection
```typescript
{
  id: string,
  buyerId: string,
  sellerId: string,
  product: Product,
  purchaseDate: Date,
  totalAmount: number
}
```

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers with email/password
2. Firebase creates user account
3. User document created in Firestore
4. Context provides auth state throughout app

### Product Management
1. Authenticated users can create listings
2. Products stored in Firestore with seller info
3. Real-time updates across all users
4. Sellers can edit/delete their own products

### Shopping Experience
1. Browse products with filtering/search
2. Add items to persistent cart
3. Checkout creates purchase records
4. Products marked as unavailable when sold

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Build command `npm run build`, publish directory `out`
- **Firebase Hosting**: Use `firebase deploy` after setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is built for educational purposes and hackathon submission.

## 🎉 Acknowledgments

- Design inspiration from modern sustainable brands
- Firebase for backend infrastructure
- Next.js team for the amazing framework
- GSAP for smooth animations
- Tailwind CSS for utility-first styling

---

**Built with ❤️ for a sustainable future** 🌱