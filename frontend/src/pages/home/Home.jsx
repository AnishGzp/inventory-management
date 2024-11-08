import "./home.css";

import React, { useEffect, useState } from "react";
import { ErrorScreen } from "../../components/index.js";

export default function Home() {
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
    return <ErrorScreen />;
  }

  return <div>Home</div>;
}
