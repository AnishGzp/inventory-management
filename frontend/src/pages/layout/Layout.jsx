import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ErrorScreen, Navbar } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const [hasToken, setHasToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  if (hasToken === null) {
    return <h1>Loading...</h1>;
  } else if (!hasToken) {
    return <ErrorScreen />;
  }

  const navItems = [
    {
      title: "Dashboard",
      id: "dashboard",
    },
    {
      title: "Products",
      id: "products",
    },
    {
      title: "Vendor",
      id: "vendor",
    },
  ];

  function handleClick(e) {
    const { id } = e.target;
    if (id === "dashboard") {
      navigate("/");
    } else {
      navigate(id);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");

    toast.success("User logged out", { autoClose: 1500 });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  const active =
    location.pathname === "/" ? "dashboard" : location.pathname.substring(1);

  return (
    <>
      <div className="layout">
        <Navbar
          navItems={navItems}
          handleClick={handleClick}
          active={active}
          handleLogout={handleLogout}
        />
        <Outlet />
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}
