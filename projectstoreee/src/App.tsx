import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductsDetail";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} /> {/* 404 fallback */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
