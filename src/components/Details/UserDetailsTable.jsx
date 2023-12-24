import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function UserDetailsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://rahimstore.onrender.com/api/orders/all")
      .then((res) => res.json())
      .then((ordersData) => {
        const userOrders = ordersData?.filter(
          (order) => order.userId === user?.uid
        );
        setData(userOrders);
      })
      .catch((error) => console.error("Error fetching orders data:", error))
      .finally(() => {
        setLoading(false);
      });
  }, [user?.uid]);

  const rows = data?.map((order) => {
    return {
      id: order._id,
      cName: order.shipping.name,
      amount: (order.total / 100).toLocaleString(),
      dStatus: order.delivery_status,
      totalProduct: order.products.length,
      date: moment(order.updatedAt).fromNow(),
    };
  });
  const columns = [
    { id: "cName", label: "Name", minWidth: 130 },
    {
      id: "totalProduct",
      label: "Total Product",
      minWidth: 100,
    },
    {
      id: "amount",
      label: "Amount($)",
      minWidth: 100,
    },
    {
      id: "dStatus",
      label: "Delivery Status",
      minWidth: 100,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 130,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 130,
      
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
