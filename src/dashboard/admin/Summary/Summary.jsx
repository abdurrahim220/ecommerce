import React from "react";

import { FaUser, FaChartBar, FaClipboard } from "react-icons/fa";

import "./style.scss";
import Widget from "./Widget";
const Summary = () => {
  const data = [
    {
      icon: <FaUser />,
      digits: 50,
      isMoney: false,
      title: "User",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipboard />,
      digits: 50,
      isMoney: false,
      title: "Order",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: 20,
    },
    {
      icon: <FaChartBar />,
      digits: 50,
      isMoney: false,
      title: "Earning",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: 60,
    },
  ];

  return (
    <div className="summary">
      <div className="mainStats">
        <div className="overView">
          <div className="title">
            <h2>Overview</h2>
            <p>
              How your shop is performing and compared to the previous month.
            </p>
          </div>
          <div className="widgetWrapper">
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="sideStats"></div>
    </div>
  );
};

export default Summary;
