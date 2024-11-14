import "./navbar.css";

import React from "react";

export default function Navbar(props) {
  const { navItems, handleClick, active, handleLogout, username } = props;

  return (
    <div className="navbar">
      <div className="navbar_top">
        {navItems.map((item, index) => (
          <div
            className={`navbar_nav_items ${active === item.id ? "active" : ""}`}
            id={item.id}
            key={index}
            onClick={handleClick}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="navbar_bottom">
        <div className="navbar_user">{username}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
