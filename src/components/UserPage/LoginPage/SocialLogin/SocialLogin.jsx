import React, { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { FaGithub, FaGoogle } from "react-icons/fa";
import axios from "axios";

import "./style.scss";
import { AuthContext } from "../../../../provider/AuthProvider";
const SocialLogin = () => {
  const { signInWithG } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogIn = () => {
    signInWithG()
      .then((result) => {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          // photo: loggedInUser.photoURL,
        };
        navigate(from, { replace: true });
       
        axios
          .post("https://rahimstore.onrender.com/api/register", saveUser)
          .then((response) => {
            navigate(from, { replace: true });
          })
          .catch((error) => console.error("Error registering user:", error));
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="social-icons">
      <FaGoogle
        className="icons"
        onClick={() => handleGoogleLogIn()}
        size={40}
        color=""
      />
      <FaGithub className="icons" size={40} />
    </div>
  );
};

export default SocialLogin;
