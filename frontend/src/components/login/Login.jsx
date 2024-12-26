import "./login.css";

import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginPage } from "../../assets/index.js";

export default function Login() {
  const [userdata, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let prevTitle = document.title;
    document.title = `Login || ${prevTitle}`;

    const token = localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }

    return () => {
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    if (hasToken) {
      toast.success("Token exists! User authentication successfull", {
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [hasToken, navigate]);

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://inventory-management-1m3p.onrender.com/auth/getUser",
        {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (res.status === 400 && data?.missingFields) {
        toast.error("Enter all the fields");
        data.missingFields.forEach((item) => {
          document.getElementById(item).classList.add("error");
        });
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else if (res.status === 400 && data?.code === 11223) {
        toast.error("User does not exist");
      } else if (res.status === 400 && data?.code === 11224) {
        toast.error("Password does not match");
      } else if (res.status === 200) {
        toast.success("User authenticated successffull", { autoClose: 1500 });
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (hasToken === null) {
    return <div>Loading...</div>;
  }

  return (
    <section className="login">
      <div className="login_container">
        <div className="login_container-content">
          <div className="login_container-content_info">
            <div className="login_container-content_info-title">Login</div>
            <div className="login_container-content_info-subtitle">
              <p>See your growth and get support</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login_container-content_form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div
              className="login_container-content_form-input"
              onChange={handleChange}
            >
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter the password"
              />
            </div>

            <button disabled={loading}>
              {loading ? "Signing-in..." : "Sign-in"}
            </button>
          </form>
          <p>
            Not registered yet? <Link to="/register">Create a new account</Link>
          </p>
        </div>

        <div className="login_container-image">
          <img src={loginPage} alt="Login image" />
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
}
