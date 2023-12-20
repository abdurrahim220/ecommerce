import React from "react";

import "./style.scss";
import { Link } from "react-router-dom";
import ListProduct from "../../../components/ListProduct/ListProduct";

const Products = () => {
  return (
    <div className="products-container">
      <div className="create-product-container">
        <h1>Product</h1>
        <Link to="/dashboard/products/create">
          <button>Create</button>
        </Link>
      </div>
      <div className="product-list-container">
        <ListProduct />
      </div>
    </div>
  );
};

export default Products;
