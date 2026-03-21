import { useEffect, useState } from "react";
import {
  obtenerProviders,
  crearProvider,
  actualizarProvider,
  eliminarProvider
} from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    phoneNumber: "",
    address: "",
    reputation: ""
  });

  useEffect(() => { cargarProviders(); }, []);

  const cargarProviders = async () => {
    try {
      const data = await obtenerProviders();
      setProviders(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando proveedores");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarProvider(editingId, form);
        setEditingId(null);
      } else {
        await crearProvider(form);
      }

      setForm({ title: "", description: "", phoneNumber: "", address: "", reputation: "" });
      cargarProviders();
    } catch (error) {
      console.error(error);
      alert("Error guardando proveedor");
    }
  };

  const handleEdit = (provider) => {
    setForm({
      title: provider.title,
      description: provider.description,
      phoneNumber: provider.phoneNumber,
      address: provider.address,
      reputation: provider.reputation
    });
    setEditingId(provider.idProvider);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este proveedor?")) return;
    try {
      await eliminarProvider(id);
      cargarProviders();
    } catch (error) {
      console.error(error);
      alert("Error eliminando proveedor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800">Gestión de Proveedores</h2>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                name="title"
                placeholder="Nombre"
                value={form.title}
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
                {editingId ? "Actualizar proveedor" : "Crear proveedor"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", description: "", phoneNumber: "", address: "", reputation: "" });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>

          </form>
        </div>

        {/* LISTA DE PROVEEDORES */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Lista de proveedores</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((p) => (
              <div key={p.idProvider} className="border rounded-lg p-4 flex flex-col justify-between">

                <div>
                  <h4 className="font-semibold text-lg">{p.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{p.description}</p>
                  <p className="text-sm">📞 {p.phoneNumber}</p>
                  <p className="text-sm text-gray-600">📍 {p.address}</p>
                  <p className="text-sm text-gray-500">⭐ {p.reputation}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(p)}>Editar</Button>
                  <Button onClick={() => handleDelete(p.idProvider)}>Eliminar</Button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}