import React, { useState } from "react";
import "./style.scss";
import axios  from 'axios';

const CreateProduct = () => {
  const [productImg, setProductImg] = useState("");

  // console.log(productImg)

  const [formData, setFormData] = useState({
    image: productImg,
    category: "",
    title: "",
    price: "",
    desc: "",
  });

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
      const response = await axios.post("http://localhost:5000/api/newProducts", formData);

      if (response.status === 200) {
        console.log("Product created successfully!");
        // You can perform additional actions here, such as redirecting the user
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
                required
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                <option value="SmartWatch">SmartWatch</option>
                <option value="WirelessEarbuds">WirelessEarbuds</option>
                <option value="BluetoothSpeakers">BluetoothSpeakers</option>
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
                required
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
                required
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
                required
              />
            </div>
            <div>
              <textarea
                id="desc" // changed from description to desc
                name="desc"
                placeholder="Product Description"
                value={formData.desc}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="preview-image-container">
          <p>Image Preview:</p>
          <img id="image-preview" className="" alt="Preview" />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
