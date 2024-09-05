import React from "react";
import { useState } from "react";
import Possession from "../../src/models/possessions/Possession.js";
import Flux from "../../src/models/possessions/Flux.js";
import Patrimoine from "../../src/models/Patrimoine.js";
import data from "../../../data/data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";

const patrimoineCalculates = () => {
  const [selectUpdateDate, setSelectUpdateDate] = useState(null);
  const [patrimoineCalcul, setPatrimoineCalcul] = useState(0);
  const possessions = data[1].data.possessions;

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
      <div className="p-4">
        <div className="mb-1">
          <label htmlFor="dateInput" className="form-label">
            Choisir la date de la mise à jour :
          </label>
          <div className="mt-2">
            <DatePicker
              selected={selectUpdateDate}
              onChange={(date) => setSelectUpdateDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Date de mise à jour"
            />
          </div>
        </div>
        <div className="mt-4 mb-4">
          <Button onClick={calculatePatrimoineCalcul}>
            Mise à jour Patrimoine
          </Button>
        </div>
        <div className="calcResult">
          <p>Valeur du Patrimoine à date : </p>
          <strong className="finalValue">
            {Math.round(patrimoineCalcul).toLocaleString()}{" "}
          </strong>{" "}
          Ariary
        </div>
      </div>
    </>
  );
};
export default patrimoineCalculates;
