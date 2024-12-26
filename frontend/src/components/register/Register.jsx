import "./register.css";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { loginPage } from "../../assets/index.js";

export default function Register() {
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    phoneNo: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let prevTitle = document.title;
    document.title = `Register || ${prevTitle}`;

    return () => {
      document.title = prevTitle;
    };
  }, []);

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  }

  function validateInput(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");

    if (/^\d*$/.test(value) && value.length <= 10) {
      setUserData((prevData) => ({ ...prevData, [id]: value }));
    }
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/auth/newUser",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (res.status === 500) {
      toast.error("User does not created");
    } else if (data?.error?.code === "ER_DUP_ENTRY") {
      toast.error("Email already exists");
    } else if (res.status === 400 && data.missingFields) {
      toast.error("Enter all the fields");
      data.missingFields.forEach((item) => {
        document.getElementById(item).classList.add("error");
      });
    } else if (res.status === 200) {
      toast.success("User created successfully", {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }

    setLoading(false);
  }

  return (
    <section className="register">
      <div className="register_container">
        <div className="register_container-image">
          <img src={loginPage} alt="Login image" />
        </div>
        <div className="register_container-content">
          <div className="register_container-content_info">
            <div className="register_container-content_info-title">
              Register
            </div>
            <div className="register_container-content_info-subtitle">
              <p>Manage all your inventory efficiently</p>
              <p>
                Let's get you all set up so you can verify your personal account
                and begin setting up your work profile
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="register_container-content_form-input">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                placeholder="Enter your last name"
                onChange={handleChange}
              />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="phoneNo">Phone no.</label>
              <input
                type="tel"
                id="phoneNo"
                placeholder="Enter your phone number"
                onChange={validateInput}
                value={userData.phoneNo}
              />
            </div>
            <div className="register_container-content_form-input_pass ">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter the password"
                onChange={handleChange}
              />
            </div>

            <button disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
}
