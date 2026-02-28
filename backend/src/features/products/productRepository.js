import { db } from "../../config/db.js";

// Crear producto
export const createProductRepo = async (product, userId) => {
  const {
    title,
    description,
    price,
    units,
    unitType,
    quantityAvailable,
    provider_idProvider
  } = product;

  const [result] = await db.query(
    `INSERT INTO product 
    (title, description, price, units, unitType, quantityAvailable, user_idUsuario, provider_idProvider)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      price,
      units,
      unitType,
      quantityAvailable,
      userId,
      provider_idProvider
    ]
  );

  return result.insertId;
};

// Obtener productos del usuario
export const getProductsRepo = async (userId) => {
  const [rows] = await db.query(
    `SELECT p.*, pr.title AS providerName
     FROM product p
     JOIN provider pr ON p.provider_idProvider = pr.idProvider
     WHERE p.user_idUsuario = ?
     ORDER BY p.idProduct DESC`,
    [userId]
  );

  return rows;
};

// Obtener producto por id
export const getProductByIdRepo = async (id, userId) => {
  const [rows] = await db.query(
    `SELECT * FROM product 
     WHERE idProduct = ? AND user_idUsuario = ?`,
    [id, userId]
  );

  return rows[0];
};

// Actualizar producto
export const updateProductRepo = async (id, product, userId) => {
  const {
    title,
    description,
    price,
    units,
    unitType,
    quantityAvailable,
    provider_idProvider
  } = product;

  await db.query(
    `UPDATE product SET
      title=?,
      description=?,
      price=?,
      units=?,
      unitType=?,
      quantityAvailable=?,
      provider_idProvider=?
     WHERE idProduct=? AND user_idUsuario=?`,
    [
      title,
      description,
      price,
      units,
      unitType,
      quantityAvailable,
      provider_idProvider,
      id,
      userId
    ]
  );
};

// Eliminar producto
export const deleteProductRepo = async (id, userId) => {
  await db.query(
    `DELETE FROM product 
     WHERE idProduct=? AND user_idUsuario=?`,
    [id, userId]
  );
};