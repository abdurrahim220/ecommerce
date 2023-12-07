import "./CartItem.scss";

import prod from "../../../assets/products/earbuds-prod-1.webp";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { useContext } from "react";
const CartItem = () => {
  const { cartItems, handleRemoveFromCart } = useContext(Context);
  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div key={item} className="cart-product">
          <div className="image-container">
            <img src={item.image} alt="" />
          </div>
          <div className="prod-details">
            <div className="name">{item.title}</div>
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />
            <div className="quantity-buttons">
              <span>{item.quantity}</span>
            </div>
            <div className="text">
              <span>{item.quantity}</span>
              <span>x</span>
              <span>${item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
