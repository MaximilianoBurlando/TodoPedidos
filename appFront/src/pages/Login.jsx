import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const mail = e.target.mail.value;
    const password = e.target.password.value;

    try {
      const data = await loginUsuario({ mail, password });

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
    <form onSubmit={handleLogin}>
      <input type="email" name="mail" placeholder="Email" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <Button type="submit" variant="primary">Iniciar sesión</Button>
    </form>
  );
}