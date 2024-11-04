import "./login.css";

import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { loginPage } from "../../assets/index.js";

export default function Login() {
  useEffect(() => {
    let prevTitle = document.title;
    document.title = `Login || ${prevTitle}`;

    return () => {
      document.title = prevTitle;
    };
  }, []);

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
          <form>
            <div className="login_container-content_form-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className="login_container-content_form-input ">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter the password"
              />
            </div>

            <button>Sign Up</button>
          </form>
          <p>
            Not registered yet? <Link to="/register">Create a new account</Link>
          </p>
        </div>

        <div className="login_container-image">
          <img src={loginPage} alt="Login image" />
        </div>
      </div>
    </section>
  );
}
