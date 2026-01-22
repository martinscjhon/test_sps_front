import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/global.css";

const PublicLayout: React.FC = () => {
  return (
    <div className="public-layout">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
