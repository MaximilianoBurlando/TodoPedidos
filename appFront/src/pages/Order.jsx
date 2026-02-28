import { useEffect, useState } from "react";
import {
  obtenerOrders,
  crearOrder,
  actualizarOrder,
  eliminarOrder,
  obtenerClients,
  obtenerProducts
} from "../services/api";

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [form, setForm] = useState({
    deliveryAddress: "",
    title: "",
    date: "",
    note: "",
    state: "",
    client_idClient: ""
  });

  // 🔵 Cargar todo al iniciar
  useEffect(() => {
    cargarOrders();
    cargarClients();
    cargarProducts();
  }, []);

  const cargarOrders = async () => {
    try {
      const data = await obtenerOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando pedidos");
    }
  };

  const cargarClients = async () => {
    try {
      const data = await obtenerClients();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarProducts = async () => {
    try {
      const data = await obtenerProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔵 Agregar/quitar productos
  const toggleProduct = (product) => {
    const exists = selectedProducts.find(p => p.product_idProduct === product.idProduct);

    if (exists) {
      setSelectedProducts(
        selectedProducts.filter(p => p.product_idProduct !== product.idProduct)
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          product_idProduct: product.idProduct,
          quantity: 1,
          price: product.price
        }
      ]);
    }
  };

  const changeQuantity = (id, quantity) => {
    setSelectedProducts(
      selectedProducts.map(p =>
        p.product_idProduct === id
          ? { ...p, quantity: parseInt(quantity) }
          : p
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.deliveryAddress || !form.title || !form.date || !form.state || !form.client_idClient) {
      return alert("Completá todos los campos obligatorios");
    }

    if (selectedProducts.length === 0) {
      return alert("Seleccioná al menos un producto");
    }

    const totalAmount = selectedProducts.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    const dataToSend = {
      ...form,
      amount: totalAmount,
      products: selectedProducts
    };

    try {
      if (editingId) {
        await actualizarOrder(editingId, dataToSend);
        setEditingId(null);
      } else {
        await crearOrder(dataToSend);
      }

      // Reset
      setForm({
        deliveryAddress: "",
        title: "",
        date: "",
        note: "",
        state: "",
        client_idClient: ""
      });
      setSelectedProducts([]);

      cargarOrders();

    } catch (error) {
      console.error(error);
      alert("Error guardando pedido");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este pedido?")) return;

    try {
      await eliminarOrder(id);
      cargarOrders();
    } catch (error) {
      console.error(error);
      alert("Error eliminando pedido");
    }
  };
  const handleEdit = (order) => {
    setEditingId(order.idPedido);

    setForm({
        deliveryAddress: order.deliveryAddress,
        title: order.title,
        date: order.date?.split("T")[0] || order.date,
        note: order.note || "",
        state: order.state,
        client_idClient: order.client_idClient
    });

    // 👇 cargar productos del pedido
    if (order.products) {
        setSelectedProducts(
        order.products.map(p => ({
            product_idProduct: p.product_idProduct,
            quantity: p.quantity,
            price: p.price
        }))
        );
    }
  };
  
  return (
    <div>
      <h2>Pedidos</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="deliveryAddress"
          placeholder="Dirección"
          value={form.deliveryAddress}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          name="note"
          placeholder="Nota"
          value={form.note}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="Estado"
          value={form.state}
          onChange={handleChange}
          required
        />

        {/* 🔵 SELECT CLIENTE */}
        <select
          name="client_idClient"
          value={form.client_idClient}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar cliente</option>
          {clients.map(c => (
            <option key={c.idClient} value={c.idClient}>
              {c.name}
            </option>
          ))}
        </select>

        <hr />

        <h4>Productos</h4>

        {products.map(p => (
          <div key={p.idProduct}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleProduct(p)}
                checked={selectedProducts.some(sp => sp.product_idProduct === p.idProduct)}
              />
              {p.title} (${p.price})
            </label>

            {selectedProducts.some(sp => sp.product_idProduct === p.idProduct) && (
              <input
                type="number"
                min="1"
                value={
                  selectedProducts.find(sp => sp.product_idProduct === p.idProduct)?.quantity
                }
                onChange={(e) => changeQuantity(p.idProduct, e.target.value)}
              />
            )}
          </div>
        ))}

        <button type="submit">
          {editingId ? "Actualizar pedido" : "Crear pedido"}
        </button>
      </form>

      <hr />

      <h3>Lista de pedidos</h3>

        <ul>
        {orders.map(o => (
            <li key={o.idPedido}>
            <strong>{o.title}</strong> - {o.clientName} <br />
            Dirección: {o.deliveryAddress} <br />
            Fecha: {o.date} - Total: ${o.amount} <br />
            Estado: {o.state} <br />

            <strong>Productos:</strong>
            <ul>
                {o.products?.map(p => (
                <li key={p.product_idProduct}>
                    {p.title} - Cantidad: {p.quantity} - ${p.price}
                </li>
                ))}
            </ul>

            <button onClick={() => handleEdit(o)}>
                Editar
            </button>

            <button onClick={() => handleDelete(o.idPedido)}>
                Eliminar
            </button>
            </li>
        ))}
        </ul>
    </div>
  );
}