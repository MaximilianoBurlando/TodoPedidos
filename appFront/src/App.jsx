import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Provider from "./pages/Provider.jsx";
import Client from "./pages/Client.jsx";
import Product from "./pages/Product.jsx";
import Order from "./pages/Order.jsx";
import User from "./pages/User.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* Layout se aplica solo a rutas protegidas */}
          <Route element={<Layout />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/providers" element={<Provider />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/user" element={<User />} />
            {/* Agregá aquí otras páginas protegidas */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}