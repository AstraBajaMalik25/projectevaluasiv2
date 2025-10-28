import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Memuat produk...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Produk tidak ditemukan.</p>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-10">
      <Card className="w-full max-w-3xl shadow-md">
        <CardContent className="p-6 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-contain rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">
              Rp {(product.price * 16000).toLocaleString()}
            </p>
            <div className="flex gap-3">
              <Button onClick={handleAddToCart}>Tambah ke Keranjang 🛒</Button>
              <Link to="/products">
                <Button variant="outline">Kembali</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
