import React from "react";

export default function Button({ children, onClick, type = "button", disabled = false, variant = "primary" }) {
  // Definimos estilos base y variantes
  const baseStyles = "py-3 px-6 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-300 text-white hover:bg-blue-400 focus:ring-blue-200",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-200",
    disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  };

  const appliedVariant = disabled ? variants.disabled : variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${appliedVariant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}