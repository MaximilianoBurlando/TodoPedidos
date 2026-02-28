import { db } from "../../config/db.js";

export const createProviderRepo = async (provider, userId) => {
  const { title, description, phoneNumber, address, reputation, image } = provider;

  const [result] = await db.query(
    `INSERT INTO provider 
     (title, description, phoneNumber, address, reputation, image, user_idUsuario)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description, phoneNumber, address, reputation, image || null, userId]
  );

  return result.insertId;
};

export const getProvidersRepo = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM provider WHERE user_idUsuario = ? ORDER BY idProvider DESC",
    [userId]
  );

  return rows;
};

export const getProviderByIdRepo = async (id, userId) => {
  const [rows] = await db.query(
    "SELECT * FROM provider WHERE idProvider = ? AND user_idUsuario = ?",
    [id, userId]
  );

  return rows[0];
};

export const updateProviderRepo = async (id, provider, userId) => {
  const { title, description, phoneNumber, address, reputation, image } = provider;

  await db.query(
    `UPDATE provider
     SET title=?, description=?, phoneNumber=?, address=?, reputation=?, image=?
     WHERE idProvider=? AND user_idUsuario=?`,
    [title, description, phoneNumber, address, reputation, image || null, id, userId]
  );
};

export const deleteProviderRepo = async (id, userId) => {
  await db.query(
    "DELETE FROM provider WHERE idProvider = ? AND user_idUsuario = ?",
    [id, userId]
  );
};