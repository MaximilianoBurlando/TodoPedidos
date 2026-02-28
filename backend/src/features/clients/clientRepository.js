import { db } from "../../config/db.js";

// Crear cliente
export const createClientRepo = async (client, userId) => {
  const { name, phoneNumber, description, address, reputation } = client;

  const [result] = await db.query(
    `INSERT INTO client (name, phoneNumber, description, address, reputation, user_idUsuario)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, phoneNumber, description, address, reputation, userId]
  );

  return result.insertId;
};

// Obtener clientes de un usuario
export const getClientsRepo = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM client WHERE user_idUsuario = ? ORDER BY idClient DESC",
    [userId]
  );

  return rows;
};

// Obtener cliente por id y usuario
export const getClientByIdRepo = async (id, userId) => {
  const [rows] = await db.query(
    "SELECT * FROM client WHERE idClient = ? AND user_idUsuario = ?",
    [id, userId]
  );

  return rows[0];
};

// Actualizar cliente (solo si es del usuario)
export const updateClientRepo = async (id, client, userId) => {
  const { name, phoneNumber, description, address, reputation } = client;

  await db.query(
    `UPDATE client 
     SET name=?, phoneNumber=?, description=?, address=?, reputation=?
     WHERE idClient=? AND user_idUsuario=?`,
    [name, phoneNumber, description, address, reputation, id, userId]
  );
};

// Eliminar cliente (solo si es del usuario)
export const deleteClientRepo = async (id, userId) => {
  await db.query(
    "DELETE FROM client WHERE idClient=? AND user_idUsuario=?",
    [id, userId]
  );
};