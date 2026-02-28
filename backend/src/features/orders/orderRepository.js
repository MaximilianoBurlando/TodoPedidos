import { db } from "../../config/db.js";

// Obtener todos los pedidos de un usuario
export const getOrdersRepo = async (userId) => {
  const [orders] = await db.query(
    `SELECT o.*, c.name AS clientName
     FROM \`order\` o
     LEFT JOIN client c ON o.client_idClient = c.idClient
     WHERE o.user_idUsuario = ?
     ORDER BY o.date DESC`,
    [userId]
  );

  for (const order of orders) {
    const [products] = await db.query(
      `SELECT op.product_idProduct, op.quantity, op.price, p.title
       FROM order_product op
       JOIN product p ON op.product_idProduct = p.idProduct
       WHERE op.order_idPedido = ?`,
      [order.idPedido]
    );

    order.products = products;
  }

  return orders;
};
// Obtener pedido por id (y usuario)
export const getOrderByIdRepo = async (id, userId) => {
  const [rows] = await db.query(
    `SELECT * FROM \`order\` WHERE idPedido = ? AND user_idUsuario = ?`,
    [id, userId]
  );
  return rows[0];
};

// Crear pedido
export const createOrderRepo = async (order, userId) => {
  const {
    deliveryAddress,
    title,
    date,
    amount,
    note,
    state,
    client_idClient,
    products // 👈 array de productos
  } = order;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Crear pedido
    const [result] = await connection.query(
      `INSERT INTO \`order\`
       (deliveryAddress, title, date, amount, note, state, user_idUsuario, client_idClient)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [deliveryAddress, title, date, amount, note || null, state, userId, client_idClient]
    );

    const orderId = result.insertId;

    // 2️⃣ Insertar productos
    for (const p of products) {
      await connection.query(
        `INSERT INTO order_product
         (order_idPedido, product_idProduct, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, p.product_idProduct, p.quantity, p.price]
      );
    }

    await connection.commit();
    return orderId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Actualizar pedido
export const updateOrderRepo = async (id, order, userId) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const { deliveryAddress, title, date, amount, note, state, client_idClient, products } = order;

    await connection.query(
      `UPDATE \`order\`
       SET deliveryAddress=?, title=?, date=?, amount=?, note=?, state=?, client_idClient=?
       WHERE idPedido=? AND user_idUsuario=?`,
      [deliveryAddress, title, date, amount, note, state, client_idClient, id, userId]
    );

    // 1️⃣ borrar productos anteriores
    await connection.query(
      `DELETE FROM order_product WHERE order_idPedido=?`,
      [id]
    );

    // 2️⃣ insertar nuevos
    for (const p of products) {
      await connection.query(
        `INSERT INTO order_product
         (order_idPedido, product_idProduct, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [id, p.product_idProduct, p.quantity, p.price]
      );
    }

    await connection.commit();

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Eliminar pedido
export const deleteOrderRepo = async (id, userId) => {
  await db.query(
    `DELETE FROM \`order\` WHERE idPedido=? AND user_idUsuario=?`,
    [id, userId]
  );
};