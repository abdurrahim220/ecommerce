import React from "react";

import "./Sidebar.scss";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="title">
        <h1>Admin</h1>
      </div>
      <div className="quickLink">
        <Link to="/dashboard/summary">Summary</Link>
      </div>
    </div>
  );
};

export default Sidebar;
