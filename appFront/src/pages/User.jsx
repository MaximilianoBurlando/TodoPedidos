import { useEffect, useState } from "react";
import { obtenerPerfil, actualizarPerfil } from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Mi Perfil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GRID DE INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              name="mail"
              type="email"
              placeholder="Email"
              value={form.mail}
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
          </div>

          {/* TEXTAREA DE DESCRIPCIÓN */}
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none h-28"
          />

          <Button type="submit" className="w-full md:w-auto">
            Actualizar Perfil
          </Button>
        </form>
      </div>
    </div>
  );
}