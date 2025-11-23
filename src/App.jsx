import { Routes, Route, useLocation } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import UserProvider from "./context/UserProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import UserRoute from "./components/UserRoute";

function App() {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <UserProvider>
      <CartProvider>
        <div className="flex flex-col bg-gray-100 min-h-screen">
          {!isLoginPage && <Navbar />}

          <div className="flex-1">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/dashboard"
                element={
                  <UserRoute>
                    <DashboardPage />
                  </UserRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {!isLoginPage && <Footer />}
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
