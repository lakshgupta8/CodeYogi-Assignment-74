# AwesomeBuy.com 🛒

An e-commerce web application built with React, Vite, and Tailwind CSS featuring user authentication, product browsing, shopping cart functionality, and 10-minute same-day delivery.

### Implementation Notes
- **Authentication Scope**: Unlike the video tutorial, which secured all pages, this project implements protected routes specifically for dashboard and other authentication-dependent sections.

## 🌟 Features

### Core Functionality
- **Product Catalog**: Browse products with search, filtering, and pagination
- **Product Details**: View detailed information about each product with star ratings
- **Shopping Cart**: Add, remove, and manage items in your cart
- **User Authentication**: Complete auth flow with signup, login, and password recovery
- **Protected Routes**: Secure dashboard accessible only to authenticated users
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### User Experience
- **Real-time Cart Updates**: Instant cart total calculations
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: User-friendly error messages and alerts
- **Empty States**: Clear messaging for empty cart
- **Mobile Menu**: Optimized navigation for mobile devices

## 🛠️ Tech Stack

- **Framework**: React 19.1
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 6.30
- **HTTP Client**: Axios 1.12
- **Form Management**: Formik 2.4 + Yup 1.7
- **Icons**: Lucide React 0.546 + React Icons 5.5
- **Package Manager**: pnpm

## 📁 Project Structure

```
CodeYogi-Assignment-74/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── CartList.jsx
│   │   ├── CartRow.jsx
│   │   ├── CartTotals.jsx
│   │   ├── Filter.jsx
│   │   ├── Pagination.jsx
│   │   ├── Loading.jsx
│   │   ├── UserRoute.jsx    # Protected route wrapper
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   └── DashboardPage.jsx
│   ├── context/             # React Context providers
│   │   ├── CartContext.js
│   │   ├── CartProvider.jsx
│   │   ├── UserContext.js
│   │   └── UserProvider.jsx
│   ├── hooks/               # Custom React hooks
│   ├── api.js               # API client configuration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # App entry point
├── public/                  # Static assets
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "CodeYogi-Assignment-74"
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🔐 Authentication Flow

The application implements a complete authentication system:

1. **Sign Up**: New users can create an account with email and password
2. **Login**: Existing users can sign in with their credentials
3. **Token Management**: JWT tokens stored in localStorage for session persistence
4. **Protected Routes**: Dashboard accessible only to authenticated users
5. **Auto Login**: Users automatically logged in if valid token exists
6. **Logout**: Clear user session and redirect to home

## 🛒 Shopping Cart

The cart system uses React Context API for state management:

- Add/remove products from cart
- Adjust item quantities
- Persistent cart state across navigation
- Real-time total calculation
- Empty cart state handling

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Dedicated mobile menu component
- Optimized layouts for all screen sizes
- Touch-friendly UI elements

## 🌐 API Integration

The application connects to a backend API for:
- Product data fetching
- User authentication
- Cart operations
- Order management

API base URL: `https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com`

## 🎨 UI Components

### Reusable Components
- **ProductCard**: Display product information in grid
- **Filter**: Search and filter products
- **Pagination**: Navigate through product pages
- **StarRating**: Visual product ratings
- **Loading**: Loading state indicators
- **Input**: Styled form input component
- **UserRoute**: Authentication wrapper for protected routes

## 🔧 Configuration

### Vite Configuration
Located in `vite.config.js` - configured for React with optimal build settings.

### Tailwind CSS
Using Tailwind CSS v4 with Vite plugin for styling.

### ESLint
Code quality maintained with ESLint and recommended React rules.

## 📦 Dependencies

### Production
- React & React DOM for UI
- React Router for navigation
- Axios for API calls
- Formik & Yup for forms and validation
- Tailwind CSS for styling

### Development
- Vite for fast development
- ESLint for code quality
- Prettier for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the CodeYogi assignment series.

## 👨‍💻 Developer

Created as part of CodeYogi Video 74 assignment.

---

**Note**: This is a learning project built as part of a coding course. The backend API is hosted on AWS Lambda and may have usage limitations.
