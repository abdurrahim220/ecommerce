import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import SocialLogin from "./SocialLogin/SocialLogin";
import { AuthContext } from "../../../provider/AuthProvider";

const Login = () => {
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // Perform login
    login(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        navigate('/');
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Login</h1>
        <form className="form-body" action="">
          <label className="js-item" htmlFor="">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="focus-input"></div>
            <div className="error-message">{emailError}</div>
          </label>
          <label className="js-item" htmlFor="">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="focus-input"></div>
            <div className="error-message">{passwordError}</div>
          </label>
          <button className="login-btn" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <section className="social-login">
          <h1 className="text-social">Social Login</h1>
          <SocialLogin />
        </section>
        <section>
          <span>
            If new to the store please <Link to={"/register"}>register</Link>
          </span>
        </section>
      </div>
    </div>
  );
};

export default Login;
