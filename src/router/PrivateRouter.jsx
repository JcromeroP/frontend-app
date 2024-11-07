import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;