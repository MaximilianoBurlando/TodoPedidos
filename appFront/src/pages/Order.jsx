import { useEffect, useState } from "react";
import {
  obtenerOrders,
  crearOrder,
  actualizarOrder,
  eliminarOrder,
  obtenerClients,
  obtenerProducts
} from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

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
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Gestión de pedidos
        </h2>

        {/* FORMULARIO */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* GRID INPUTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                name="deliveryAddress"
                placeholder="Dirección"
                value={form.deliveryAddress}
                onChange={handleChange}
                required
              />

              <Input
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                required
              />

              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <Input
                name="state"
                placeholder="Estado"
                value={form.state}
                onChange={handleChange}
                required
              />

              <Input
                name="note"
                placeholder="Nota"
                value={form.note}
                onChange={handleChange}
                className="md:col-span-2"
              />

              {/* SELECT CLIENTE */}
              <select
                name="client_idClient"
                value={form.client_idClient}
                onChange={handleChange}
                required
                className="border rounded-md p-2 md:col-span-2"
              >
                <option value="">Seleccionar cliente</option>
                {clients.map(c => (
                  <option key={c.idClient} value={c.idClient}>
                    {c.name}
                  </option>
                ))}
              </select>

            </div>

            {/* PRODUCTOS */}
            <div>
              <h4 className="text-lg font-medium mb-3">Productos</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map(p => (
                  <div
                    key={p.idProduct}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => toggleProduct(p)}
                        checked={selectedProducts.some(sp => sp.product_idProduct === p.idProduct)}
                      />
                      <span className="text-sm">
                        {p.title} (${p.price})
                      </span>
                    </div>

                    {selectedProducts.some(sp => sp.product_idProduct === p.idProduct) && (
                      <Input
                        type="number"
                        min="1"
                        className="w-20"
                        value={
                          selectedProducts.find(sp => sp.product_idProduct === p.idProduct)?.quantity
                        }
                        onChange={(e) => changeQuantity(p.idProduct, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BOTÓN */}
            <Button type="submit" className="w-full md:w-auto">
              {editingId ? "Actualizar pedido" : "Crear pedido"}
            </Button>

          </form>
        </div>

        {/* LISTA */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Lista de pedidos</h3>

          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.idPedido} className="border rounded-lg p-4">

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{o.title}</h4>
                    <p className="text-sm text-gray-500">{o.clientName}</p>
                  </div>

                  <span className="text-sm text-gray-600">
                    ${o.amount}
                  </span>
                </div>

                <p className="text-sm mt-2">
                  📍 {o.deliveryAddress}
                </p>

                <p className="text-sm text-gray-500">
                  📅 {o.date} — {o.state}
                </p>

                {/* PRODUCTOS */}
                <div className="mt-3 text-sm">
                  <strong>Productos:</strong>
                  <ul className="list-disc ml-5">
                    {o.products?.map(p => (
                      <li key={p.product_idProduct}>
                        {p.title} × {p.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACCIONES */}
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(o)}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(o.idPedido)}>
                    Eliminar
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}