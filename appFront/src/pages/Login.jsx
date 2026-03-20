import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    
    e.preventDefault();
    
    const mail = e.target.mail.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const data = await loginUsuario({ mail, password });
      setLoading(false);
      // 🔐 Guardar token
      localStorage.setItem("token", data.token);

      // (opcional) guardar usuario
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/menu");

    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
      <form onSubmit={handleLogin}>
        <Input className="text-1xl font-bold" type="email" name="mail" placeholder="Email" required />
        <Input className="text-1xl font-bold" type="password" name="password" placeholder="Contraseña" required />
        <Button size="lg" className="h-12 px-8 text-lg font-semibold bg-blue-600 
      hover:bg-blue-700 text-white"  type="submit" variant="primary" disabled={loading}>{loading ? 
        "Ingresando..." : "Iniciar sesión"}</Button>
      </form>
    </div>
  );
}