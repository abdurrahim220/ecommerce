import "./Header.scss";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { BiLogInCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
import { AuthContext } from "../../provider/AuthProvider";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const { user, logOut } = useContext(AuthContext);

  // console.log(user);

  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount } = useContext(Context);
  const [anchorEl, setAnchorEl] =useState(null);
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

  const handleLogOut = () => {
    // console.log("hello");
    logOut()
      .then()
      .catch((error) => {
        // console.log(error);
      });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/all-items")}>All Items</li>
          </ul>
           

          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            {user ? (
              <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img src={user.photoURL} className="user-image" alt="logo" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
               <MenuItem onClick={() => { navigate("/dashboard"); handleClose(); }}>Dashboard</MenuItem>

                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
            ) : (
              <BiLogInCircle onClick={() => navigate("/login")} />
            )}

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
