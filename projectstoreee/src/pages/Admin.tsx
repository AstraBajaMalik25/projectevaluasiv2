import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (!title || !price || !image) return alert("Lengkapi semua field!");

    const newProduct: Product = {
      id: products.length + 1,
      title,
      price: parseFloat(price),
      image,
    };

    setProducts([...products, newProduct]);
    setTitle("");
    setPrice("");
    setImage("");
    alert("Produk baru berhasil ditambahkan (lokal)");
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin hapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

      {/* Form Tambah Produk */}
      <div className="max-w-lg mx-auto mb-8 p-4 border rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Tambah Produk Baru</h3>
        <input
          type="text"
          placeholder="Nama Produk"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="URL Gambar"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tambah Produk
        </button>
      </div>

      {/* Daftar Produk */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mx-auto mb-3"
            />
            <h4 className="font-semibold text-sm mb-1 line-clamp-2">
              {product.title}
            </h4>
            <p className="text-gray-600 mb-3">Rp {product.price.toLocaleString()}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
