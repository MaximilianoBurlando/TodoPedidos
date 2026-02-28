import { Link, useNavigate, Outlet } from "react-router-dom";
import "../styles.css";

export default function Layout() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>

      {/* BARRA SUPERIOR */}
      <div className="topbar">

        <Link to="/menu">Inicio</Link>
        <Link to="/orders">Pedidos</Link>
        <Link to="/products">Productos</Link>
        <Link to="/clients">Clientes</Link>
        <Link to="/providers">Proveedores</Link>
        <Link to="/user">Perfil</Link>

        <button onClick={logout}>
          Cerrar sesión
        </button>

      </div>

      {/* CONTENIDO */}
      <div className="contenido">
        <Outlet />
      </div>

    </div>
  );
}