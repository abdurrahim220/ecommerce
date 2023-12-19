import React from "react";

import "./widget.scss";
const Widget = ({ data }) => {
  return (
    <div className="styleWidget">
      <div
        className="icon"
        style={{ color: data.color, backgroundColor: data.bgColor }}
      >
        {data.icon}
      </div>
      <div className="text">
        <h3>
          {data?.isMoney
            ? "$" + data?.digits?.toLocaleString()
            : data?.digits?.toLocaleString()}
        </h3>
        <p>{data.title}</p>
      </div>

      {data.percentage > 0 ? (
        <div style={{color:"green"}} className="percentage">{Math.floor(data.percentage) + "%"}</div>
      ) : (
        <div style={{color:"red"}} className="percentage"> {Math.floor(data.percentage) + "%"}</div>
      )}
    </div>
  );
};

export default Widget;
