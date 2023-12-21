import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./style.scss";
import axios from "axios";
import { baseUrl, fetchDataFromApi } from "../../utils/api";
import Swal from "sweetalert2";

export default function EditProduct({ prodId }) {
  const [open, setOpen] = React.useState(false);
  const [productImg, setProductImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: productImg,
    category: "",
    title: "",
    price: "",
    desc: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      TransformFile(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setFormData({
          ...formData,
          image: reader.result,
        });
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = reader.result;
      };
    } else {
      setProductImg("");
      setFormData({
        ...formData,
        image: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.put(
        baseUrl + `/products/${prodId}`,
        formData
      );

      if (response.status === 200) {
        Swal.fire({
          position: "bottom-start",
          icon: "success",
          title: "Your product has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        style={{ Outlet: "none", backgroundColor: "blue" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <div className="create-product-container">
            <div>
              <h1 className="title">Create a Product</h1>
            </div>
            <div className="form-container">
              <div className="create-form-container">
                <form onSubmit={handleSubmit}>
                  <div>
                    <select
                      id="category" // changed from brand to category
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled hidden>
                        Select Category
                      </option>
                      <option value="SmartWatch">SmartWatch</option>
                      <option value="WirelessEarbuds">WirelessEarbuds</option>
                      <option value="BluetoothSpeakers">
                        BluetoothSpeakers
                      </option>
                      <option value="Headphones">Headphones</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      id="title" // changed from name to title
                      name="title"
                      placeholder="Product Title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Product Price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <textarea
                      id="desc" // changed from description to desc
                      name="desc"
                      placeholder="Product Description"
                      value={formData.desc}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit">
                    {loading ? "Updating..." : "Update"}
                  </button>
                </form>
              </div>
              <div className="preview-image-container">
                <p>Image Preview:</p>
                <img id="image-preview" className="" alt="Preview" />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
