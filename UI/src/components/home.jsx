import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


const homePage = () => {
  return (
    <>
     <div className="home-container">
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
              <Navbar.Collapse id="basic-navbar-nav" className="navbar-position">
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

        <div className="home-page">
          <h2>WELCOME TO YOUR PERSONNAL ASSETS MANAGER</h2>
          <p>Build your wealth with confidence and achieve your financial goals through effective management.
          Your assets deserve the best care. 
          </p>
          <Button variant="success" className="home-button">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default homePage;
