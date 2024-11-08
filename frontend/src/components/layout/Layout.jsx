import "./layout.css";

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [hasToken, setHasToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  }, []);

  if (hasToken === null) {
    return <div>Loading...</div>;
  }

  if (!hasToken) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return (
    <>
      <h1>Layut</h1>
      <Outlet />
    </>
  );
}
