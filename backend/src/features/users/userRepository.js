import { db } from "../../config/db.js";

// Obtener usuario por ID (desde JWT)
export const getUserByIdRepo = async (id) => {
  const [rows] = await db.query(
    `SELECT idUsuario, name, mail, phoneNumber, description, address
     FROM user
     WHERE idUsuario = ?`,
    [id]
  );

  return rows[0];
};

// Actualizar usuario
export const updateUserRepo = async (id, user) => {
  const { name, mail, phoneNumber, description, address } = user;

  await db.query(
    `UPDATE user
     SET name=?, mail=?, phoneNumber=?, description=?, address=?
     WHERE idUsuario=?`,
    [name, mail, phoneNumber, description, address, id]
  );
};