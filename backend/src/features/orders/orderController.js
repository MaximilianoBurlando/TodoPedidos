import {
  getOrdersRepo,
  getOrderByIdRepo,
  createOrderRepo,
  updateOrderRepo,
  deleteOrderRepo
} from "./orderRepository.js";

// GET /orders
export const getOrders = async (req, res) => {
  try {
    console.log("USER ID EN GET:", req.userId); // 👈 AGREGAR ESTO
    const orders = await getOrdersRepo(req.userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo pedidos" });
  }
};

// GET /orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdRepo(req.params.id, req.userId);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /orders
export const createOrder = async (req, res) => {
  try {
    const id = await createOrderRepo(req.body, req.userId);
    res.status(201).json({ message: "Pedido creado", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /orders/:id
export const updateOrder = async (req, res) => {
  try {
    const order = await getOrderByIdRepo(req.params.id, req.userId);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

    await updateOrderRepo(req.params.id, req.body, req.userId);
    res.json({ message: "Pedido actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const order = await getOrderByIdRepo(req.params.id, req.userId);
    if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

    await deleteOrderRepo(req.params.id, req.userId);
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};