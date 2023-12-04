import "./CartItem.scss";

import prod from "../../../assets/products/earbuds-prod-1.webp";
import { MdClose } from "react-icons/md";
const CartItem = () => {
  return (
    <div className="cart-products">
      <div className="cart-product">
        <div className="image-container">
          <img src={prod} alt="" />
        </div>
        <div className="prod-details">
          <div className="name">product name</div>
          <MdClose className="close-btn" />
          <div className="quantity-buttons">
            <span>-</span>
            <span>5</span>
            <span>+</span>
          </div>
          <div className="text">
            <span>3</span>
            <span>x</span>
            <span>$4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
