import "./Header.scss";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { BiLogInCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount } = useContext(Context);
  const handleScroll = () => {
    const offset = window.scrollY;
    // console.log(offset)
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li>About</li>
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            Rahim
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <BiLogInCircle onClick={() => navigate("/login")} />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
