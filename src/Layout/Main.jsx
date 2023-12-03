import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AppContext from "../utils/context";


const Main = () => {
  return (
    <AppContext>
      <Header />
      <Outlet />
      <Footer />
    </AppContext>
  );
};

export default Main;
