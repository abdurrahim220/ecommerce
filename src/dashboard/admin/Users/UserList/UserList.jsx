import { DataGrid } from "@mui/x-data-grid";

import "./UserList.scss";
import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";
import ViewUser from "../../../../components/ViewUser/ViewUser";
import { baseUrl } from "../../../../utils/api";

export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //   console.log(data)

  useEffect(() => {
    fetch("http://localhost:5000/api/allUsers")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [loading]);

  const rows = data?.map((user) => {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user.email,
      role: user.role,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },

    { field: "uName", headerName: "Name", width: 130 },
    {
      field: "uEmail",
      headerName: "Email",
      width: 100,
    },
    {
      field: "role",
      headerName: "Role",
      width: 70,
      renderCell: (params) => {
        return (
          <div>
            {params.row.role === "admin" ? (
              <div className="admin">Admin</div>
            ) : (
              <div className="user">User</div>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",

      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            >
              Delete
            </button>

            <ViewUser id={params.row.id} />
          </div>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmationResult.isConfirmed) {
      try {
        setLoading(true);

        const response = await axios.delete(baseUrl + `/allUsers/${id}`);

        setData((prevData) => prevData.filter((user) => user._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting user:", error);

        Swal.fire({
          icon: "error",
          title: "Error deleting user",
          text: "An error occurred while deleting the user. Please try again.",
        });
      } finally {
        setLoading(false);
      }
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
