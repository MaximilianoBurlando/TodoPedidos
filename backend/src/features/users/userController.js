import {
  getUserByIdRepo,
  updateUserRepo
} from "./userRepository.js";

// Obtener perfil propio
export const getProfile = async (req, res) => {
  try {
    const user = await getUserByIdRepo(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar perfil propio
export const updateProfile = async (req, res) => {
  try {
    await updateUserRepo(req.userId, req.body);

    res.json({
      message: "Perfil actualizado"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};