import React from "react";
import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";
import data from "../../../data/data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const possessionsTable = () => {
  const actualDay = new Date(Date.now());
  const possessionList = data[1].data.possessions;
  return (
    <>
      <h1>PATRIMOINE</h1>
      <h4>Liste de Patrimoines</h4>
      <Table striped bordered hover className=" text-center " variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Libelle</th>
            <th>Valeur initiale</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessionList.map((item, index) => {
            const possession = item.jour
              ? new Flux(
                  item.possesseur,
                  item.libelle,
                  item.valeurConstante,
                  new Date(item.dateDebut),
                  item.dateFin ? new Date(item.dateFin) : null,
                  item.tauxAmortissement,
                  item.jour
                )
              : new Possession(
                  item.possesseur,
                  item.libelle,
                  item.valeur,
                  new Date(item.dateDebut),
                  item.dateFin ? new Date(item.dateFin) : null,
                  item.tauxAmortissement
                );
            const actualValues = possession.getValeur(actualDay);

            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.libelle}</td>
                <td className="text-center">{item.valeur}</td>
                <td className="text-center">
                  {new Date(item.dateDebut).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {item.dateFin
                    ? new Date(item.dateFin).toLocaleDateString()
                    : "-"}
                </td>
                <td className="text-center">
                  {item.tauxAmortissement ? item.tauxAmortissement + "%" : "0%"}
                </td>
                <td className="text-center">
                  {Math.round(actualValues).toLocaleString()}
                  <span> Ar</span>
                </td>
                <td className="text-center action">
                  <Button variant="primary" className="me-1 ">
                    Edit
                  </Button>
                  <Button variant="warning" className="me-1">
                    Close
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(indexToDelete)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="create-button">
        <Link to="/possession/create" target="_blank">
          <Button variant="success">Create Patrimoine</Button>
        </Link>
      </div>
    </>
  );
};

export default possessionsTable;
