import { useEffect, useState } from "react";
import {
  obtenerProducts,
  crearProduct,
  actualizarProduct,
  eliminarProduct,
  obtenerProviders
} from "../services/api";

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
    <div>
      <h2>Productos</h2>

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
          name="price"
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="units"
          type="number"
          placeholder="Unidades por pack"
          value={form.units}
          onChange={handleChange}
        />

        <input
          name="unitType"
          placeholder="Tipo de unidad (kg, caja, etc)"
          value={form.unitType}
          onChange={handleChange}
        />

        <input
          name="quantityAvailable"
          type="number"
          placeholder="Stock disponible"
          value={form.quantityAvailable}
          onChange={handleChange}
        />

        <select
          name="provider_idProvider"
          value={form.provider_idProvider}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar proveedor</option>
          {providers.map((p) => (
            <option key={p.idProvider} value={p.idProvider}>
              {p.title}
            </option>
          ))}
        </select>

        <button type="submit">
          {editingId ? "Actualizar producto" : "Crear producto"}
        </button>

        {editingId && (
          <button
            type="button"
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
          </button>
        )}
      </form>

      <hr />

      <h3>Lista de productos</h3>

      <ul>
        {products.map((p) => (
          <li key={p.idProduct}>
            <strong>{p.title}</strong><br />
            {p.description}<br />
            Precio: ${p.price}<br />
            Stock: {p.quantityAvailable} {p.unitType}<br />
            Proveedor: {p.providerName}<br />
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.idProduct)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}