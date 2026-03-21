import { useEffect, useState } from "react";
import {
  obtenerProducts,
  crearProduct,
  actualizarProduct,
  eliminarProduct,
  obtenerProviders
} from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    units: "",
    unitType: "",
    quantityAvailable: "",
    provider_idProvider: ""
  });

  useEffect(() => {
    cargarProductos();
    cargarProviders();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando productos");
    }
  };

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
        await actualizarProduct(editingId, form);
        setEditingId(null);
      } else {
        await crearProduct(form);
      }

      setForm({
        title: "",
        description: "",
        price: "",
        units: "",
        unitType: "",
        quantityAvailable: "",
        provider_idProvider: ""
      });

      cargarProductos();

    } catch (error) {
      console.error(error);
      alert("Error guardando producto");
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      units: product.units,
      unitType: product.unitType,
      quantityAvailable: product.quantityAvailable,
      provider_idProvider: product.provider_idProvider
    });

    setEditingId(product.idProduct);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    try {
      await eliminarProduct(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert("Error eliminando producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold text-gray-800">
          Gestión de productos
        </h2>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                name="title"
                placeholder="Nombre"
                value={form.title}
                onChange={handleChange}
                required
              />

              <Input
                name="price"
                type="number"
                step="0.01"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
              />

              <Input
                name="units"
                type="number"
                placeholder="Unidades por pack"
                value={form.units}
                onChange={handleChange}
              />

              <Input
                name="quantityAvailable"
                type="number"
                placeholder="Stock disponible"
                value={form.quantityAvailable}
                onChange={handleChange}
              />

              <Input
                name="unitType"
                placeholder="Tipo (kg, caja, etc)"
                value={form.unitType}
                onChange={handleChange}
              />

              {/* SELECT */}
              <select
                name="provider_idProvider"
                value={form.provider_idProvider}
                onChange={handleChange}
                required
                className="border rounded-md p-2"
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map((p) => (
                  <option key={p.idProvider} value={p.idProvider}>
                    {p.title}
                  </option>
                ))}
              </select>

              {/* DESCRIPCIÓN FULL */}
              <Input
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="md:col-span-2"
              />

            </div>

            {/* BOTONES */}
            <div className="flex gap-3">
              <Button type="submit">
                {editingId ? "Actualizar producto" : "Crear producto"}
              </Button>

              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      description: "",
                      price: "",
                      units: "",
                      unitType: "",
                      quantityAvailable: "",
                      provider_idProvider: ""
                    });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>

          </form>
        </div>

        {/* LISTA */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            Lista de productos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {products.map((p) => (
              <div
                key={p.idProduct}
                className="border rounded-lg p-4 flex flex-col justify-between"
              >

                <div>
                  <h4 className="font-semibold text-lg">
                    {p.title}
                  </h4>

                  <p className="text-sm text-gray-500 mb-2">
                    {p.description}
                  </p>

                  <p className="text-sm">
                    💲 <strong>${p.price}</strong>
                  </p>

                  <p className="text-sm text-gray-600">
                    📦 {p.quantityAvailable} {p.unitType}
                  </p>

                  <p className="text-sm text-gray-500">
                    Proveedor: {p.providerName}
                  </p>
                </div>

                {/* ACCIONES */}
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleEdit(p)}>
                    Editar
                  </Button>

                  <Button onClick={() => handleDelete(p.idProduct)}>
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