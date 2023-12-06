import "./Product.scss";

import prod from "../../../assets/products/earbuds-prod-1.webp";
const Product = ({ item }) => {
  return (
    <div className="product-card">
      <div className="thumbnail">
        <img src={item.image} alt="" />
      </div>
      <div className="prod-details">
        <span className="name">{item.title}</span>
        <span className="price">${item.price}</span>
      </div>
    </div>
  );
};

export default Product;
