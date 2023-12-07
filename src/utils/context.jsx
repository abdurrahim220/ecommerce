import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();

  // console.log(cartItems);
  // Only run this effect once when the component mounts

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map((item) => (subTotal += item.price * item.quantity));
    setCartSubTotal(subTotal);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    // console.log(product)
    let items = [...cartItems];
    let index = items.findIndex((p) => p._id === product._id);

    if (index !== -1) {
      // Create a new object to avoid mutation
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + quantity,
      };
    } else {
      // Create a new object for the new product
      product.quantity = quantity;
      items = [...items, product];
    }

    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p._id !== product._id);
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        categories,
        cartItems,
        setCartItems,
        cartSubTotal,
        setCartSubTotal,
        setCategories,
        handleAddToCart,
        handleRemoveFromCart,
        setProducts,
        products,
        cartCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
