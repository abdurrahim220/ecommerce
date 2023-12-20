import "./Product.scss";

import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
const Product = ({ item }) => {
  const navigate = useNavigate();
  // console.log(item)
  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${item._id}`)}
    >
      <div className="thumbnail">
      <img src={item.image.url ? item.image.url : item.image} alt="" />
      </div>
      <div className="prod-details">
        <span className="name">{item.title}</span>
        <span className="price">${item.price}</span>
      </div>
    </div>
  );
};

export default Product;
