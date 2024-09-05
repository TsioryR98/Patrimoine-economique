import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PossessionsTable from "./components/possessionsTable.jsx";
import PatrimoineCalculate from "./components/patrimoineCalculate.jsx";
import PossessionCreate from "./components/possessionCreate.jsx";
import HomePage from "./components/home.jsx";
import "./App.css";


const App = () => {
  return (
    <>
      <Router>
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/patrimoine" element={<PatrimoineCalculate />} />
         <Route path="/possession" element={<PossessionsTable />} />
         <Route path="/possession/create" element={<PossessionCreate />} />
      </Routes>
      </Router>
    </>
  );
};

export default App;
