import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/header.css";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Plataforma" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
