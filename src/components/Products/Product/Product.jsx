import "./Product.scss";

import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
const Product = ({ item }) => {
  const navigate = useNavigate();
  // console.log(item)
  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${item?._id}`)}
    >
      <div className="thumbnail">
        <img src={item?.image.url ? item?.image.url : item?.image} alt="" />
      </div>
      <div className="prod-details">
        <span className="name">{item?.title}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="price">${item?.price}</span>
          <span className="price">*****</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
