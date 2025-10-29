import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>🛒 E-Commerce Lite</h1>

      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/contact">Contact</Link>

        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && user === "admin" && <Link to="/admin">Admin</Link>}
        {isLoggedIn && (
          <button
            onClick={logout}
            style={{
              background: "none",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "0.25rem 0.75rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
