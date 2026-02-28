import { useEffect, useState } from "react";
import {
  obtenerProviders,
  crearProvider,
  actualizarProvider,
  eliminarProvider
} from "../services/api";

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

  useEffect(() => {
    cargarProviders();
  }, []);

  const cargarProviders = async () => {
    try {
      const data = await obtenerProviders();
      setProviders(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando proveedores");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await actualizarProvider(editingId, form);
        setEditingId(null);
      } else {
        await crearProvider(form);
      }

      setForm({
        title: "",
        description: "",
        phoneNumber: "",
        address: "",
        reputation: ""
      });

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
    <div>
      <h2>Proveedores</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Nombre"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="phoneNumber"
          placeholder="Teléfono"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="reputation"
          placeholder="Reputación"
          value={form.reputation}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Actualizar proveedor" : "Crear proveedor"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                description: "",
                phoneNumber: "",
                address: "",
                reputation: ""
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h3>Lista de proveedores</h3>

      <ul>
        {providers.map((p) => (
          <li key={p.idProvider}>
            <strong>{p.title}</strong> <br />
            {p.description} <br />
            Tel: {p.phoneNumber} <br />
            Dirección: {p.address} <br />
            Reputación: {p.reputation} <br />

            <button onClick={() => handleEdit(p)}>
              Editar
            </button>

            <button onClick={() => handleDelete(p.idProvider)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}