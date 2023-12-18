import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../provider/AuthProvider";

const Cart = ({ setShowCart }) => {
  const navigate = useNavigate();
  const { cartSubTotal, cartItems } = useContext(Context);

  const { user } = useContext(AuthContext);
  // console.log(user)
  const handleCheckOut = () => {
    // console.log(cartItems);
   
    // console.log(user_id);
    if (user) {
      axios
        .post(`${baseUrl}/create-checkout-session`, {
          cartItems,
          useRId: user?.uid,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          // console.log(err.message);
        });
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <div className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </div>
        </div>
        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta" onClick={() => navigate("/")}>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">${cartSubTotal}</span>
              </div>
              <div className="button">
                <button
                  onClick={() => handleCheckOut(cartItems)}
                  className="checkout-cta"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
