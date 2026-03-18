import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import "../index.css";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
    
      <h1 className="text-4xl font-bold">TodoPedidos</h1>

      <div className="flex gap-4">
      <Button onClick={() => navigate("/login")}>
        Iniciar sesión
      </Button>

      <Button onClick={() => navigate("/register")}>
        Crear usuario
      </Button>
      </div>
    </div>
  );

}

