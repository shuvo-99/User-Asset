import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
