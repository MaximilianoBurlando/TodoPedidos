import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export async function registrarUsuario(data) {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Error al registrar" };
  }
}

export async function loginUsuario(credentials) {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return response.json();
}

const PROVIDERS_API = "http://localhost:3000/api/providers";

export async function obtenerProviders() {
  const token = localStorage.getItem("token");

  const response = await fetch(PROVIDERS_API, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener proveedores");
  }

  return response.json();
}

export async function crearProvider(provider) {
  const token = localStorage.getItem("token");

  const response = await fetch(PROVIDERS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(provider)
  });

  if (!response.ok) {
    throw new Error("Error al crear proveedor");
  }

  return response.json();
}
export const actualizarProvider = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/providers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Error al actualizar proveedor");
  }

  return response.json();
};

export const eliminarProvider = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/providers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Error al eliminar proveedor");
  }

  return response.json();
};

export const obtenerClients = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/clients", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Error fetching clients");

  return response.json();
};

export const crearClient = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error creating client");

  return response.json();
};

export const actualizarClient = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error updating client");

  return response.json();
};

export const eliminarClient = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Error deleting client");

  return response.json();
};

export const obtenerProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/products", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Error al obtener productos");

  return response.json();
};

export const crearProduct = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error al crear producto");

  return response.json();
};

export const actualizarProduct = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  if (!response.ok) throw new Error("Error al actualizar producto");

  return response.json();
};

export const eliminarProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:3000/api/products/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (!response.ok) throw new Error("Error al eliminar producto");

  return response.json();
};

export const obtenerOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Error al obtener pedidos");

  return response.json();
};

export async function crearOrder(data) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al crear pedido");
  return response.json();
}

export async function actualizarOrder(id, data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error al actualizar pedido");
  return response.json();
}

export async function eliminarOrder(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Error al eliminar pedido");
  return response.json();
}

export const obtenerPerfil = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Error al obtener perfil");

  return response.json();
};

export const actualizarPerfil = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error al actualizar perfil");

  return response.json();
};

export const checkUserExistsRepo = async (mail, name, phoneNumber) => {
  const [rows] = await db.query(
    `SELECT idUsuario 
     FROM user 
     WHERE mail = ? OR name = ? OR phoneNumber = ?`,
    [mail, name, phoneNumber]
  );

  return rows.length > 0;
};