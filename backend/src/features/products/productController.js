import {
  createProductRepo,
  getProductsRepo,
  getProductByIdRepo,
  updateProductRepo,
  deleteProductRepo
} from "./productRepository.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsRepo(req.userId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const id = await createProductRepo(req.body, req.userId);
    res.status(201).json({ message: "Producto creado", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await getProductByIdRepo(req.params.id, req.userId);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    await updateProductRepo(req.params.id, req.body, req.userId);
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await getProductByIdRepo(req.params.id, req.userId);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    await deleteProductRepo(req.params.id, req.userId);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};