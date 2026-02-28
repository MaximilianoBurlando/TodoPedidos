import {
  createClientRepo,
  getClientsRepo,
  getClientByIdRepo,
  updateClientRepo,
  deleteClientRepo
} from "./clientRepository.js";

// Obtener todos los clientes del usuario
export const getClients = async (req, res) => {
  try {
    const clients = await getClientsRepo(req.userId);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear cliente
export const createClient = async (req, res) => {
  try {
    const id = await createClientRepo(req.body, req.userId);
    res.status(201).json({ message: "Cliente creado", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
export const updateClient = async (req, res) => {
  try {
    const client = await getClientByIdRepo(req.params.id, req.userId);
    if (!client) return res.status(404).json({ message: "Cliente no encontrado" });

    await updateClientRepo(req.params.id, req.body, req.userId);
    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
export const deleteClient = async (req, res) => {
  try {
    const client = await getClientByIdRepo(req.params.id, req.userId);
    if (!client) return res.status(404).json({ message: "Cliente no encontrado" });

    await deleteClientRepo(req.params.id, req.userId);
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};