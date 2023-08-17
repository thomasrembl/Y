import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AllProfil from "../../pages/AllProfil";

import Home from "../../pages/Home";
import Trending from "../../pages/Trending";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil/:userId" element={<AllProfil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Index;
