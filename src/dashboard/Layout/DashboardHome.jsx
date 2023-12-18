import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

import './style.scss'
const DashboardHome = () => {
  return (
    <>
    
      <div className="container-nav">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="left-bar">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
