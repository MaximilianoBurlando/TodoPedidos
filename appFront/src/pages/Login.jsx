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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/LoginIMG.png"
          alt="Ilustración"
          className="w-full h-full object-cover"
        />
        {/* Overlay opcional */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent"></div>
      </div>

    <div className="relative z-10 w-full flex items-center justify-center">

    <div className="bg-white/20 backdrop-blur-md w-[750px] min-h-screen 
    flex items-center justify-center shadow-xl">

    <div className="p-8 w-full">

        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full items-center">
          <h2 className="text-6xl font-bold text-outline mb-4 text-center">Bienvenido</h2>
          <div className="w-[500px] flex flex-col gap-4">
          <Input
            className="w-1/2 mx-auto  border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
            type="email"
            name="mail"
            placeholder="Email"
            required
          />

          <Input
            className="w-1/2 mx-auto  border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />

          <Button
            size="lg"
            className="h-12 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </Button>
          </div>
          <p className="bg-white/20 backdrop-blur-md border border-white/30 text-[#000] 
          text-sm mt-4 px-4 py-2 rounded-lg inline-block">
                ¿No tienes cuenta?{" "}
                <span
                  className="text-[#2563eb] underline cursor-pointer hover:text-blue-400 transition"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </span>
          </p>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}