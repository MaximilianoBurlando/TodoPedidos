import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// Axios instance
const API = axios.create({
  baseURL: API_BASE,
});

// ================== AUTH ==================

export const registrarUsuario = (data) =>
  API.post("/auth/register", data).then(res => res.data);

export const loginUsuario = (credentials) =>
  API.post("/auth/login", credentials).then(res => res.data);

// ================== PROVIDERS ==================

export const obtenerProviders = () =>
  API.get("/providers", authHeader()).then(res => res.data);

export const crearProvider = (data) =>
  API.post("/providers", data, authHeader()).then(res => res.data);

export const actualizarProvider = (id, data) =>
  API.put(`/providers/${id}`, data, authHeader()).then(res => res.data);

export const eliminarProvider = (id) =>
  API.delete(`/providers/${id}`, authHeader()).then(res => res.data);

// ================== CLIENTS ==================

export const obtenerClients = () =>
  API.get("/clients", authHeader()).then(res => res.data);

export const crearClient = (data) =>
  API.post("/clients", data, authHeader()).then(res => res.data);

export const actualizarClient = (id, data) =>
  API.put(`/clients/${id}`, data, authHeader()).then(res => res.data);

export const eliminarClient = (id) =>
  API.delete(`/clients/${id}`, authHeader()).then(res => res.data);

// ================== PRODUCTS ==================

export const obtenerProducts = () =>
  API.get("/products", authHeader()).then(res => res.data);

export const crearProduct = (data) =>
  API.post("/products", data, authHeader()).then(res => res.data);

export const actualizarProduct = (id, data) =>
  API.put(`/products/${id}`, data, authHeader()).then(res => res.data);

export const eliminarProduct = (id) =>
  API.delete(`/products/${id}`, authHeader()).then(res => res.data);

// ================== ORDERS ==================

export const obtenerOrders = () =>
  API.get("/orders", authHeader()).then(res => res.data);

export const crearOrder = (data) =>
  API.post("/orders", data, authHeader()).then(res => res.data);

export const actualizarOrder = (id, data) =>
  API.put(`/orders/${id}`, data, authHeader()).then(res => res.data);

export const eliminarOrder = (id) =>
  API.delete(`/orders/${id}`, authHeader()).then(res => res.data);

// ================== USER ==================

export const obtenerPerfil = () =>
  API.get("/users/me", authHeader()).then(res => res.data);

export const actualizarPerfil = (data) =>
  API.put("/users/me", data, authHeader()).then(res => res.data);

// ================== TOKEN ==================

function authHeader() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}