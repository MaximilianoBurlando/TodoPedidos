import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
  }

  return (

    <nav style={{
      background: "#222",
      color: "white",
      padding: "10px",
      display: "flex",
      gap: "15px"
    }}>

      <Link to="/Pedidos" style={{ color: "white" }}>
        Crear Pedido
      </Link>

      <Link to="/Productos" style={{ color: "white" }}>
        Pedidos
      </Link>

      <Link to="/Contactos" style={{ color: "white" }}>
        Pedidos
      </Link>

      <Link to="/Proveedores" style={{ color: "white" }}>
        Pedidos
      </Link>

      <Link to="/Perfil" style={{ color: "white" }}>
        Pedidos
      </Link>

      <button onClick={logout}>
        Logout
      </button>

    </nav>

  );
}
