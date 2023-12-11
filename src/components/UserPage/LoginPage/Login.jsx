import React from 'react'

import { useLocation, useNavigate } from "react-router-dom";
import './Login.scss'

const Login = () => {
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log(from)
  return (
    <div>Login</div>
  )
}

export default Login;