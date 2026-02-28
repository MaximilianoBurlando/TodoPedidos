import {
  createProviderRepo,
  getProvidersRepo,
  getProviderByIdRepo,
  updateProviderRepo,
  deleteProviderRepo
} from "./providerRepository.js";

export const createProvider = async (req, res) => {
  try {
    const id = await createProviderRepo(req.body, req.userId);
    res.status(201).json({ message: "Proveedor creado", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await getProvidersRepo(req.userId);
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await getProviderByIdRepo(req.params.id);

    if (!provider) {
      return res.status(404).json({
        message: "Proveedor no encontrado"
      });
    }

    res.json(provider);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const provider = await getProviderByIdRepo(req.params.id, req.userId);
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await updateProviderRepo(req.params.id, req.body, req.userId);
    res.json({ message: "Proveedor actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const provider = await getProviderByIdRepo(req.params.id, req.userId);
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    await deleteProviderRepo(req.params.id, req.userId);
    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};