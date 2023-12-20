import React from "react";
import "./AllTimeData.scss";

const AllTimeData = () => {
  return (
    <div className="main">
      <h3>All Time Data</h3>
      <div className="info">
        <div className="title">Users</div>
        <div className="data">200</div>
      </div>
      <div className="info">
        <div className="title">Products</div>
        <div className="data">200</div>
      </div>
      <div className="info">
        <div className="title">Orders</div>
        <div className="data">200</div>
      </div>
      <div className="info">
        <div className="title">Earnings</div>
        <div className="data">$200</div>
      </div>
    </div>
  );
};

export default AllTimeData;
