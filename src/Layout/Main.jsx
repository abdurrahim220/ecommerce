import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AppContext from "../utils/context";
import Newsletter from "../components/Footer/Newsletter/Newsletter";

const Main = () => {
  return (
    <AppContext>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </AppContext>
  );
};

export default Main;
