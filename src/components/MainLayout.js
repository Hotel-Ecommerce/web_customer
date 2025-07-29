import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
