import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("https://rahimstore.onrender.com/api/allUsers")
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data); // Update the state with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Wait until allUsers is populated with data
  if (allUsers.length === 0) {
    return <Loader />;
  }

  const loggedInUser = allUsers.find((person) => person.email === user?.email);

  if (loggedInUser && loggedInUser.role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
