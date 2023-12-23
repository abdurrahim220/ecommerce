import React, { useEffect, useState } from "react";

import { FaUser, FaChartBar, FaClipboard } from "react-icons/fa";

import "./style.scss";
import Widget from "./Widget";
import { fetchDataFromApi } from "../../../utils/api";
import Charts from "../../../components/Charts/Charts";
import Transactions from "../../../components/Transactions/Transactions";
import AllTimeData from "../../../components/AllTimeData/AllTimeData";
const Summary = () => {
  const [user, setUser] = useState([]);
  const [userPerc, setUserPerc] = useState(0);

  const [orders, setOrders] = useState([]);
  const [orderPerc, setOrderPerc] = useState(0);

  const [ordersIncome, setOrdersIncome] = useState([]);
  const [orderIncomePerc, setOrderIncomePerc] = useState(0);

  const compare = (a, b) => {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/stats"),
      fetchDataFromApi("/orders"),
      fetchDataFromApi("/orders/income"),
    ])
      .then(([statsRes, ordersRes, ordersIncomeRes]) => {
        statsRes.sort(compare);
        ordersRes.sort(compare);
        ordersIncomeRes.sort(compare);
        setUser(statsRes);
        setOrders(ordersRes);
        setOrdersIncome(ordersIncomeRes);

        const totalUserDifference = user[0]?.total - user[1]?.total;
        const percentage = (
          (totalUserDifference / user[1]?.total) *
          100
        ).toFixed(2);

        const totalOrderDifference = orders[0]?.total - orders[1]?.total;
        const orderPercentage = (
          (totalOrderDifference / orders[1]?.total) *
          100
        ).toFixed(2);

        const totalOrderIncomeDifference =
          ordersIncome[0]?.total - ordersIncome[1]?.total;
        const orderIncomePercentage =
          (totalOrderDifference / ordersIncome[1]?.total) * 100;

        setUserPerc(percentage);

        setOrderPerc(orderPercentage);
        setOrderIncomePerc(orderIncomePercentage);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, [user, orders, ordersIncome]);

  const data = [
    {
      icon: <FaUser />,
      digits: user[0]?.total,
      isMoney: false,
      title: "User",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: userPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Order",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: orderPerc,
    },
    {
      icon: <FaChartBar />,
      digits: ordersIncome[0]?.total ? ordersIncome[0]?.total / 100 : "",
      isMoney: true,
      title: "Earning",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: orderIncomePerc,
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
        <Charts />
      </div>
      <div className="sideStats">
        <Transactions />
        <AllTimeData />
      </div>
    </div>
  );
};

export default Summary;
