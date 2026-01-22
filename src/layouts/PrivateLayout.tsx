import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/global.css";

const PrivateLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="private-layout">
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
