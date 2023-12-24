import "./Product.scss";
import Rating from '@mui/material/Rating';
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useNavigate } from "react-router-dom";
const Product = ({ item }) => {
  const navigate = useNavigate();
  // console.log(item)
  const value = 3.5;
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
          <Rating name="read-only" value={value} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Product;
