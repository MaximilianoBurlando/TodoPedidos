import { useEffect, useState } from "react";
import {
  obtenerClients,
  crearClient,
  actualizarClient,
  eliminarClient
} from "../services/api";

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
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input name="phoneNumber" placeholder="Teléfono" value={form.phoneNumber} onChange={handleChange} />
        <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />
        <input name="reputation" placeholder="Reputación" value={form.reputation} onChange={handleChange} />
        <button type="submit">{editingId ? "Actualizar cliente" : "Crear cliente"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", description: "", phoneNumber: "", address: "", reputation: "" }); }}>Cancelar</button>}
      </form>

      <hr />

      <h3>Lista de clientes</h3>
      <ul>
        {clients.map(c => (
          <li key={c.idClient}>
            <strong>{c.name}</strong><br />
            {c.description}<br />
            Tel: {c.phoneNumber}<br />
            Dirección: {c.address}<br />
            Reputación: {c.reputation}<br />
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => handleDelete(c.idClient)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}