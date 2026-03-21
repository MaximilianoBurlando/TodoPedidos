import { useEffect, useState } from "react";
import {
  obtenerClients,
  crearClient,
  actualizarClient,
  eliminarClient
} from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    reputation: ""
  });

  useEffect(() => { cargarClients(); }, []);

  const cargarClients = async () => {
    try {
      const data = await obtenerClients();
      setClients(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando clientes");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarClient(editingId, form);
        setEditingId(null);
      } else {
        await crearClient(form);
      }
      setForm({ name: "", description: "", phoneNumber: "", address: "", reputation: "" });
      cargarClients();
    } catch (error) {
      console.error(error);
      alert("Error guardando cliente");
    }
  };

  const handleEdit = (client) => {
    setForm({
      name: client.name,
      description: client.description,
      phoneNumber: client.phoneNumber,
      address: client.address,
      reputation: client.reputation
    });
    setEditingId(client.idClient);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este cliente?")) return;
    try {
      await eliminarClient(id);
      cargarClients();
    } catch (error) {
      console.error(error);
      alert("Error eliminando cliente");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Gestión de clientes
        </h2>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                name="phoneNumber"
                placeholder="Teléfono"
                value={form.phoneNumber}
                onChange={handleChange}
              />

              <Input
                name="address"
                placeholder="Dirección"
                value={form.address}
                onChange={handleChange}
              />

              <Input
                name="reputation"
                placeholder="Reputación"
                value={form.reputation}
                onChange={handleChange}
              />

              {/* DESCRIPCIÓN FULL WIDTH */}
              <Input
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="md:col-span-2"
              />

            </div>

            <div className="flex gap-3">
              <Button type="submit">
                {editingId ? "Actualizar cliente" : "Crear cliente"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: "", description: "", phoneNumber: "", address: "", reputation: "" });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>

          </form>
        </div>

        {/* LISTA DE CLIENTES */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            Lista de clientes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((c) => (
              <div key={c.idClient} className="border rounded-lg p-4 flex flex-col justify-between">

                <div>
                  <h4 className="font-semibold text-lg">{c.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{c.description}</p>
                  <p className="text-sm">📞 {c.phoneNumber}</p>
                  <p className="text-sm text-gray-600">📍 {c.address}</p>
                  <p className="text-sm text-gray-500">⭐ {c.reputation}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(c)}>Editar</Button>
                  <Button onClick={() => handleDelete(c.idClient)}>Eliminar</Button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}