import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Charts.scss";
import { fetchDataFromApi } from "../../utils/api";
const Charts = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(sales);
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
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchDataFromApi("/orders/weakSales");
        // setSales(response);

        response.sort(compare);

        const newDate = response?.map((item) => {
          const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

          return {
            day: DAYS[item._id - 1],
            amount: item.total / 100,
          };
        });
        // console.log(newDate);
        setSales(newDate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">chart loading..</div>
      ) : (
        <div className="chart">
          <h3>Last 7 Days Earnings (US$)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Charts;
