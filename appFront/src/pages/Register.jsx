import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleCrear() {

    if (!name || !mail || !password || !password2) {
      alert("Completa los campos obligatorios");
      return;
    }

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {

      const res = await registrarUsuario({
        name,
        mail,
        phoneNumber,
        password,
        description,
        address
      });

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Usuario creado correctamente");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Error al crear usuario");
    }
  }

  return (
    <div>
      <h1>Crear Usuario</h1>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Repetir contraseña"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <button onClick={handleCrear}>
        Crear
      </button>
    </div>
  );
}