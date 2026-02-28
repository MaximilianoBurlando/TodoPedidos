import { useEffect, useState } from "react";
import { obtenerPerfil, actualizarPerfil } from "../services/api";

export default function User() {

  const [form, setForm] = useState({
    name: "",
    mail: "",
    phoneNumber: "",
    description: "",
    address: ""
  });

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      const data = await obtenerPerfil();
      setForm(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando perfil");
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
      await actualizarPerfil(form);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error actualizando perfil");
    }
  };

  return (
    <div>
      <h2>Mi Perfil</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
        <input name="mail" value={form.mail} onChange={handleChange} placeholder="Email" />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Teléfono" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />

        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
}