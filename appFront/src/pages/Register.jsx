import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/api";
import { Button, Input } from "@/components/ui";
import "../index.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleCrear(e) {
    e.preventDefault();

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
        address,
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
    <div className="relative flex min-h-screen overflow-hidden">
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/LoginIMG.png"
          alt="Ilustración"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        {/* FRANJA */}
        <div className="bg-white/20 backdrop-blur-md w-[750px] min-h-screen flex items-center justify-center shadow-xl">
          <div className="p-8 w-full">
            <form
              onSubmit={handleCrear}
              className="flex flex-col gap-6 w-full items-center"
            >
              <h2 className="text-6xl font-bold text-outline mb-4 text-center">
                Crear cuenta
              </h2>

              {/* CONTENEDOR DE INPUTS */}
              <div className="w-[500px] flex flex-col gap-4">
                <Input
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />

                <Input
                  type="email"
                  placeholder="Mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="w-full"
                />

                <Input
                  placeholder="Teléfono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                />

                <Input
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full"
                />

                <textarea
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />

                <Input
                  type="password"
                  placeholder="Repetir contraseña"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="w-full"
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Crear cuenta
                </Button>
              </div>

              {/* LINK A LOGIN */}
              <p className="bg-white/20 backdrop-blur-md border border-white/30 text-[#000] 
              text-sm mt-4 px-4 py-2 rounded-lg inline-block">
                ¿Ya tenés cuenta?{" "}
                <span
                  className="underline cursor-pointer hover:text-blue-400 text-[#2563eb]"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}