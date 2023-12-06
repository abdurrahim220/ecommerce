import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  // You can use useState or any other logic to define the initial value of the context
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // console.log(categories.categories)
  // console.log(products)

  return <Context.Provider value={{ categories,setCategories,setProducts,products }}>{children}</Context.Provider>;
};

export default AppContext;
