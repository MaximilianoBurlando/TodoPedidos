import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import "../index.css";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container flex flex-col items-center justify-center gap-6 min-h-screen">
    
      <h1 className="text-4xl font-bold">TodoPedidos</h1>

      <div className="flex gap-4">
      <Button size="lg" className="h-12 px-8 text-lg font-semibold bg-blue-600 
      hover:bg-blue-700 text-white" onClick={() => navigate("/login")}>
        Iniciar sesión
      </Button>

      <Button size="lg" className="h-12 px-8 text-lg font-semibold bg-blue-600 
      hover:bg-blue-700 text-white" onClick={() => navigate("/register")}>
        Crear usuario
      </Button>
      </div>
    </div>
  );

}

