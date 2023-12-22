import { DataGrid } from "@mui/x-data-grid";

import "./style.scss";
import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

import moment from "moment";
import { baseUrl } from "../../../utils/api";
import Order from "../../Details/Order";
export default function OrderList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [loading]);

  const rows = data?.map((order) => {
    return {
      id: order._id,
      cName: order.shipping.name,
      amount: (order.total / 100).toLocaleString(),
      dStatus: order.delivery_status,
      date: moment(order.updatedAt).fromNow(),
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },

    { field: "cName", headerName: "Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount($)",
      width: 100,
    },
    {
      field: "dStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="actions">
            {params.row.dStatus === "pending" ? (
              <div className="pending">Pending</div>
            ) : params.row.dStatus === "dispatched" ? (
              <div className="dispatched">dispatch</div>
            ) : params.row.dStatus === "delivered" ? (
              <div className="pending">delivered</div>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "actions",
      headerName: "Action",

      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleChange(params.row.id, "dispatched")}
              className="dispatchBtn"
            >
              Dispatch
            </button>
            <button
              onClick={() => handleChange(params.row.id, "delivered")}
              className="deliveryBtn"
            >
              Delivered
            </button>

            <Order id={params.row.id}/>
          </div>
        );
      },
    },
  ];

  const handleChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(baseUrl + `/orders/${id}`, {
        delivery_status: newStatus,
      });

      setData((prevData) =>
        prevData.map((order) =>
          order._id === id ? { ...order, delivery_status: newStatus } : order
        )
      );

      Swal.fire({
        icon: "success",
        title: "Order status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire({
        icon: "error",
        title: "Error updating order status",
        text: "An error occurred while updating the order status. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
