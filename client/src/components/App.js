// import { useState, useEffect } from "react";
import GlobalStyles from "../GlobalStyles";
// import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./pages/header/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/header/Cart";
import Items from "./pages/Items";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import SubmissionPage from "./pages/SubmissionPage";
import Footer from "./pages/footer/Footer";
//nav bar should be outside of router
// this will allow links to open new pages to different parts of the website
const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<SubmissionPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
