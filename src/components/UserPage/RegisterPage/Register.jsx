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

    // Validate user input
    const validationErrors = validateInputs(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Call the createUser function from your AuthContext
    createUser(user.email, user.password)
      .then((result) => {
        const firebaseUser = result.user;
        // Update user profile with additional information (e.g., name)
        return updateUser(user.name);
      })
      .then(() => {
        // Send user data to your backend using Axios
        sendUserDataToBackend(user)
          .then((backendResponse) => {
            // console.log("User data sent to backend:", backendResponse);
            // Clear the form inputs
            setUser({ name: "", email: "", password: "" });

            // Redirect or navigate after successful registration and data sent to backend
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Error sending user data to backend:", error);
          });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Handle registration error (e.g., display an error message to the user)
      });
  };

  const sendUserDataToBackend = (userData) => {
    // Adjust the URL and data according to your backend API
    const backendApiUrl = "http://localhost:5000/api/register";
    return axios.post(backendApiUrl, userData);
  };

  const handleChange = (e) => {
    // Update the user state as the user types
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing in a field
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateInputs = (data) => {
    const errors = {};

    // Validate empty fields
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
