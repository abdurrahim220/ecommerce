import { DataGrid } from "@mui/x-data-grid";

import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "../EditProduct/EditProduct";

export default function ListProduct() {
  const [data, setData] = useState([]);
  // console.log(data)

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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
            <EditProduct />
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
  const handleDelete = (id) => {
    // console.log(id)
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
