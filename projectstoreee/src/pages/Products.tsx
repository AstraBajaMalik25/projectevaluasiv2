import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Gagal fetch data produk");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Daftar Produk</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mx-auto mb-4"
            />
            <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
            <p className="text-gray-600">Rp {product.price.toLocaleString()}</p>
<Link
  to={`/product/${product.id}`}
  className="block mt-3 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-all duration-150"
>
  Detail
</Link>

          </div>
        ))}
      </div>
    </div>
  );
}
