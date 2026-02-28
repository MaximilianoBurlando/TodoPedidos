import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div>

      <h1>TodoPedidos</h1>

      <button onClick={() => navigate("/login")}>
        Iniciar sesión
      </button>

      <button onClick={() => navigate("/register")}>
        Crear usuario
      </button>

    </div>
  );

}
