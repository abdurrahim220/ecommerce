import "./SingleProduct.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";

import prod from "../../assets/products/earbuds-prod-1.webp";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { useContext, useState } from "react";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  // console.log(id)
  const [ data2 ] = useProducts(`/products`);

  const { handleAddToCart } = useContext(Context);

  const products = data2?.find((item) => item?._id === id);

  // console.log(products?.category)

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
       
            <img src={products?.image.url ? products?.image.url : products?.image} alt="" />
          </div>
          <div className="right">
            <span className="name">{products?.title}</span>
            <span className="price">${products?.price}</span>
            <span className="desc">{products?.desc}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </span>
                <span>{quantity}</span>
                <span onClick={() => setQuantity(quantity + 1)}>+</span>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(products, quantity);
                  setQuantity(1);
                }}
                className="add-to-cart-button"
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:
                <span>{products?.category}</span>
              </span>
              <span className="text-bold">
                Shares:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts productsId={id} categoryName={products?.category} />
      </div>
    </div>
  );
};

export default SingleProduct;
