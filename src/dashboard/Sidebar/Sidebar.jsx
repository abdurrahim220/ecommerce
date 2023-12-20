import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";
import "./Sidebar.scss";

const Sidebar = () => {
  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path) => {
    return isLinkActive(path) ? "blue" : "";
  };

  return (
    <div className="sidebar-container">
      <div className="title">
        <h1>Admin</h1>
      </div>

      <div className="quickLink">
        <Link
          className="link"
          to="/dashboard/summary"
          style={{ color: getLinkStyle("/dashboard/summary") }}
        >
          <FaTachometerAlt />
          Summary
        </Link>
      </div>

      <div className="quickLink">
        <Link
          className="link"
          to="/dashboard/products"
          style={{ color: getLinkStyle("/dashboard/products") }}
        >
          <FaStore />
          Products
        </Link>
      </div>

      <div className="quickLink">
        <Link
          className="link"
          to="/dashboard/orders"
          style={{ color: getLinkStyle("/dashboard/orders") }}
        >
          <FaClipboard />
          Orders
        </Link>
      </div>
      
      <div className="quickLink">
        <Link
          className="link"
          to="/dashboard/users"
          style={{ color: getLinkStyle("/dashboard/users") }}
        >
          <FaUser />
          Users
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;
