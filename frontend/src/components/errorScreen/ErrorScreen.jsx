import "./errorScreen.css";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorScreen() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="error_container">
      <div className="error_container-content">
        <div className="error_container-content_title">
          Token expired! User authentication reqiured
        </div>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
