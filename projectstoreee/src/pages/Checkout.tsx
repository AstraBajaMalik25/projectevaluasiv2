// src/pages/Checkout.tsx
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-semibold mb-4">Keranjang Kosong 🛒</h2>
        <p className="text-gray-500 mb-6">
          Silakan tambahkan produk ke keranjang dulu.
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Lihat Produk
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {cart.map((item) => (
          <Card key={item.id} className="shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  Rp {(item.price * 16000).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
              >
                Hapus
              </Button>
            </CardContent>
          </Card>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: Rp {(totalPrice * 16000).toLocaleString()}
          </p>
          <div className="flex gap-3">
            <Button onClick={clearCart} variant="outline">
              Kosongkan
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Bayar Sekarang 💳
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
