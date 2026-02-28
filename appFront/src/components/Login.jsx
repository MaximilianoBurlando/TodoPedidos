import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {

    if (!mail || !password) {
      alert("Completa todos los campos");
      return;
    }

    const res = await loginUsuario({ mail, password });

    if (res.error) {
      alert(res.error);
      return;
    }

    // 🔐 Guardar token
    localStorage.setItem("token", res.token);

    alert("Login exitoso");

    navigate("/menu"); // 🔥 aquí entra RutaProtegida
  }

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}