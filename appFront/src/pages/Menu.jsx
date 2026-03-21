import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Menu() {

  const navigate = useNavigate();

  return (
    <div className="relative min-h-[87.62vh] flex justify-center pt-[15vh] px-6">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/FondoInicioTP.png"
          alt="Fondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0"></div>
      </div>
      <div className="relative z-10 max-w-2xl text-center">
        
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
          Bienvenido a <span className="text-[#2563eb]">TodoPedidos</span>
        </h1>

        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Nos alegra tenerte aquí. <strong>TodoPedidos</strong> es tu aliado para 
          gestionar 
          tu emprendimiento de manera 
          rápida, organizada y eficiente.
        </p>

        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Podrás centralizar toda tu información, hacer seguimiento de tus pedidos
          y tomar decisiones más inteligentes para hacer crecer tu negocio.
        </p>
        
        <p className="text-lg text-gray-700 font-medium mt-6">
          🚀 ¡<span
        className="text-[#2563eb] cursor-pointer hover:underline 
        hover:text-[#1d4ed8] transition"
        onClick={() => navigate("/orders")}>Comencemos</span> a simplificar la 
        gestión de tus pedidos!
        </p>

      </div>

    </div>
  );
}