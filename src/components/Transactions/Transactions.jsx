import React, { useEffect, useState } from "react";

import "./Transactions.scss";
import { fetchDataFromApi } from "../../utils/api";
import moment from "moment"; 
const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataFromApi(`/latest-orders`);
        setOrders(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setOrders]);

  return (
    <div className="transactionsContainer">
      {isLoading ? (
        <p>Transactions ..... </p>
      ) : (
        <>
          <h3>Latest Transactions</h3>
          {orders.map((order, index) => (
            <div key={index} className="transactions">
              <p>{order.shipping.name}</p>
              <p>${(order.total / 100).toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Transactions;
