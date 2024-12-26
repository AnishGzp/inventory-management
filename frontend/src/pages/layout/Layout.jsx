import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ErrorScreen, Navbar } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  const [hasToken, setHasToken] = useState(null);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }

    fetch("https://inventory-management-1m3p.onrender.com/auth/getEmail", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      setUsername(data.user);

      if (res.status === 401) {
        localStorage.removeItem("token");
        setHasToken(false);
      }
    });
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
    {
      title: "Category",
      id: "category",
    },
    {
      title: "Sales",
      id: "sales",
    },
    {
      title: "Purchase",
      id: "purchase",
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
    navItems.find((item) => location.pathname.startsWith(`/${item.id}`))?.id ||
    "dashboard";

  return (
    <>
      <div className="layout">
        <Navbar
          navItems={navItems}
          handleClick={handleClick}
          active={active}
          handleLogout={handleLogout}
          username={username}
        />
        <Outlet />
        <ToastContainer position="bottom-right" autoClose="1500" />
      </div>
    </>
  );
}
