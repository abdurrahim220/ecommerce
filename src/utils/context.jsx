import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {
  // You can use useState or any other logic to define the initial value of the context
  const [yourValue, setYourValue] = useState("");

  return <Context.Provider value={{ yourValue }}>{children}</Context.Provider>;
};

export default AppContext;
