import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AppContext from "../utils/context";
import Newsletter from "../components/Footer/Newsletter/Newsletter";
import { useLocation } from "react-router-dom";

const Main = () => {
  const path = useLocation().pathname;
  
  return (
    <AppContext>
      <Header />

      <Outlet />

      {path === "/" && <Newsletter />}
      <Footer />
    </AppContext>
  );
};

export default Main;
