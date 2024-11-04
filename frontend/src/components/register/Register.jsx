import "./register.css";

import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { loginPage } from "../../assets/index.js";

export default function Register() {
  useEffect(() => {
    let prevTitle = document.title;
    document.title = `Register || ${prevTitle}`;

    return () => {
      document.title = prevTitle;
    };
  }, []);

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
          <form>
            <div className="register_container-content_form-input">
              <label htmlFor="fName">First Name</label>
              <input type="text" id="fName" placeholder="Enter your name" />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                placeholder="Enter your last name"
              />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="register_container-content_form-input">
              <label htmlFor="phoneNo">Phone no.</label>
              <input
                type="number"
                id="phoneNo"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="register_container-content_form-input_pass ">
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
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
