import { DataGrid } from "@mui/x-data-grid";

import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "../EditProduct/EditProduct";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import Swal from "sweetalert2";
export default function ListProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(data)

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://rahimstore.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [loading]);

  const rows = data?.map((item) => {
    return {
      id: item._id,
      imageUrl: item.image,
      pName: item.title,
      pDesc: item.desc,
      price: item.price.toLocaleString(),
    };
  });

  // console.log(rows);

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="imageContainer">
            <img src={params.row.imageUrl} alt="" />
          </div>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",

      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
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
            <EditProduct prodId={params.row.id} />
            <button
              onClick={() => navigate(`/productDetails/${params.row.id}`)}
              className="view"
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  //! todo:have to complete delete
  const handleDelete = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        setLoading(true);

        // Send DELETE request
        const response = await axios.delete(baseUrl + `/products/${id}`);

        if (response.status >= 200 && response.status < 300) {
          console.log(`Product with ID ${id} deleted successfully`);
          Swal.fire({
            position: "bottom-start",
            icon: "success",
            title: "Product has been deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false)
        } else {
          console.error(
            `Failed to delete product with ID ${id}. Server responded with status ${response.status}`
          );
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the product:",
        error.message
      );
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
