import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL no está definida");
}

const API = axios.create({
  baseURL: API_BASE,
});

// 🔐 Interceptor para agregar token automáticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================== AUTH ==================

export const registrarUsuario = (data) =>
  API.post("/auth/register", data).then(res => res.data);

export const loginUsuario = (credentials) =>
  API.post("/auth/login", credentials).then(res => res.data);

// ================== PROVIDERS ==================

export const obtenerProviders = () =>
  API.get("/providers").then(res => res.data);

export const crearProvider = (data) =>
  API.post("/providers", data).then(res => res.data);

export const actualizarProvider = (id, data) =>
  API.put(`/providers/${id}`, data).then(res => res.data);

export const eliminarProvider = (id) =>
  API.delete(`/providers/${id}`).then(res => res.data);

// ================== CLIENTS ==================

export const obtenerClients = () =>
  API.get("/clients").then(res => res.data);

export const crearClient = (data) =>
  API.post("/clients", data).then(res => res.data);

export const actualizarClient = (id, data) =>
  API.put(`/clients/${id}`, data).then(res => res.data);

export const eliminarClient = (id) =>
  API.delete(`/clients/${id}`).then(res => res.data);

// ================== PRODUCTS ==================

export const obtenerProducts = () =>
  API.get("/products").then(res => res.data);

export const crearProduct = (data) =>
  API.post("/products", data).then(res => res.data);

export const actualizarProduct = (id, data) =>
  API.put(`/products/${id}`, data).then(res => res.data);

export const eliminarProduct = (id) =>
  API.delete(`/products/${id}`).then(res => res.data);

// ================== ORDERS ==================

export const obtenerOrders = () =>
  API.get("/orders").then(res => res.data);

export const crearOrder = (data) =>
  API.post("/orders", data).then(res => res.data);

export const actualizarOrder = (id, data) =>
  API.put(`/orders/${id}`, data).then(res => res.data);

export const eliminarOrder = (id) =>
  API.delete(`/orders/${id}`).then(res => res.data);

// ================== USER ==================

export const obtenerPerfil = () =>
  API.get("/users/me").then(res => res.data);

export const actualizarPerfil = (data) =>
  API.put("/users/me", data).then(res => res.data);