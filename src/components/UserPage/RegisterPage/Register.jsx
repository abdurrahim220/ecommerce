import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios
// Update the path accordingly
import "./Register.scss";
import SocialLogin from "../LoginPage/SocialLogin/SocialLogin";
import { AuthContext } from "../../../provider/AuthProvider";

const Register = () => {
  const location = useLocation();
  const { createUser, updateUser } = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (event) => {
    event.preventDefault();

    const validationErrors = validateInputs(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Calling the createUser function from my AuthContext
    createUser(user.email, user.password)
      .then((result) => {
        const firebaseUser = result.user;
        return updateUser(user.name);
      })
      .then(() => {
        // Sending user data to backend using Axios
        sendUserDataToBackend(user)
          .then((backendResponse) => {
            setUser({ name: "", email: "", password: "" });

            // navigate(from, { replace: true });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error sending user data to backend:", error);
          });
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const sendUserDataToBackend = (userData) => {
    // Adjusting the URL and data according to your backend API
    const backendApiUrl = "https://rahimstore.onrender.com/api/register";
    return axios.post(backendApiUrl, userData);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateInputs = (data) => {
    const errors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        errors[key] = "This field is required.";
      }
    });

    return errors;
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Register</h1>
        <form className="form-body">
          <label className="js-item" htmlFor="name">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={user.name}
            />
            <div className="focus-input"></div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </label>
          <label className="js-item" htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
            />
            <div className="focus-input"></div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </label>
          <label className="js-item" htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
            <div className="focus-input"></div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </label>
          <button onClick={handleRegister} className="login-btn" type="button">
            Register
          </button>
        </form>
        <section className="social-login">
          <h1 className="text-social">Social Register</h1>
          <SocialLogin />
        </section>
        <section>
          <span>
            Already have an account <Link to={"/login"}>login</Link>
          </span>
        </section>
      </div>
    </div>
  );
};

export default Register;
