import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PossessionsTable from "./components/possessionsTable.jsx";
import PatrimoineCalculate from "./components/patrimoineCalculate.jsx";
import PossessionCreate from "./components/possessionCreate.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HomePage from "./components/home.jsx";

import "./App.css";
import "./home.css";

const App = () => {
  return (
    <>
      <Router>
        <div className="app-container">
          <Navbar
            bg="primary"
            data-bs-theme="dark"
            expand="lg"
            className="mb-4"
          >
            <Container>
              <Navbar.Brand className="brand">
                {" "}
                <Nav.Link as={Link} to="/">
                  <strong>GESTION PATRIMOINE</strong>
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/patrimoine" className="links">
                    Patrimoine
                  </Nav.Link>
                  <Nav.Link as={Link} to="/possession" className="links">
                    Possession
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="content-container">
            <Routes>
              <Route className="home-page" path="/" element={<HomePage />} />
              <Route path="/patrimoine" element={<PatrimoineCalculate />} />
              <Route path="/possession" element={<PossessionsTable />} />
              <Route path="/possession/create" element={<PossessionCreate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
