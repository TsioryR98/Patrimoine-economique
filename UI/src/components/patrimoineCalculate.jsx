import React from "react";
import { useState, useEffect } from "react";
import Possession from "../../src/models/possessions/Possession.js";
import Flux from "../../src/models/possessions/Flux.js";
import Patrimoine from "../../src/models/Patrimoine.js";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import ChartGraph from "../components/chart.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../App.css";

const patrimoineCalculates = () => {
  const [selectUpdateDate, setSelectUpdateDate] = useState(null);
  const [patrimoineCalcul, setPatrimoineCalcul] = useState(0);
  const [possessions, setPossessions] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://patrimoinebackend.onrender.com/possession"
        );
        const data = await response.json();
        setPossessions(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const calculatePatrimoineCalcul = () => {
    if (selectUpdateDate) {
      const possessionExtract = possessions.map((item) =>
        item.jour
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
            )
      );
      const patrimoine = new Patrimoine("John Doe", possessionExtract);
      const patValue = patrimoine.getValeur(selectUpdateDate);
      setPatrimoineCalcul(patValue);
    }
  };

  return (
    <>
      <div className="patrimoine-container p-2">
        <div className="calcul-container p-4">
          <Link to="/">
            <div className="menu-back"></div>
          </Link>
          <div className="mt-2">
            <label htmlFor="dateInput" className="form-label">
              Choisir la date de la mise à jour :
            </label>
            <DatePicker
              selected={selectUpdateDate}
              onChange={(date) => setSelectUpdateDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Date de mise à jour"
            />
          </div>
          <div className="mt-2 mb-2">
            <Button onClick={calculatePatrimoineCalcul}>
              Mise à jour Patrimoine
            </Button>
          </div>
          <div className="calcResult">
            <p>Valeur du Patrimoine à date : </p>
            <strong className="finalValue">
              {Math.round(patrimoineCalcul).toLocaleString()} Ariary
            </strong>
          </div>
        </div>

        <div className="chart-container">
          <ChartGraph data={chartData} />
        </div>
      </div>
    </>
  );
};

export default patrimoineCalculates;
