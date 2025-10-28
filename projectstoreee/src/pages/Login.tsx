import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔹 Ambil fungsi login dari context

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 🧠 Dummy login sederhana
    if ((username === "admin" && password === "1234") || (username === "user" && password === "1234")) {
      login(username); // simpan username ke AuthContext
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      alert(`Berhasil login sebagai ${username}`);
      navigate("/products");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login 🔐
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full mt-2">
              Masuk
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
