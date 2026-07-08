import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-utama">
      <Navbar />
      <main key={location.pathname} className="animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
