import React, { useState } from "react";
import "./App.css";
import Possession from "../../models/possessions/Possession";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import Table from "react-bootstrap/Table";
import "react-datepicker/dist/react-datepicker.css";
import data from "../../data/data.json";
import Patrimoine from "../../models/Patrimoine.js";
import Flux from "../../models/possessions/Flux.js";
import Button from "react-bootstrap/Button";

export function App(props) {
  const [textBiensMateriel, setTextBiensMateriel] = useState("");
  const [textPossesseur, setTextPossesseur] = useState("");
  const [textDepense, setTextDepense] = useState("");
  const [accountType, setAccountType] = useState("Espèces");
  const [cashAmount, setCashAmount] = useState("");
  const [cashInterest, setCashInterest] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(null);
  const [materialAmount, setMaterialAmount] = useState("");
  const [depreciationRate, setDepreciationRate] = useState("");

  const actualDay = new Date(Date.now());
  const possessions = data[1].data.possessions;
  const [selectUpdateDate, setSelectUpdateDate] = useState(null);
  const [patrimoineCalcul, setPatrimoineCalcul] = useState(0);

  const handleAccountTypeChange = (eventKey) => {
    setAccountType(eventKey);
  };

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

  // Fonctions onChange regroupées
  const handlePossesseurChange = (e) => setTextPossesseur(e.target.value);
  const handleCashAmountChange = (e) => setCashAmount(e.target.value);
  const handleCashInterestChange = (e) => setCashInterest(e.target.value);
  const handleBienChange = (e) => setTextBiensMateriel(e.target.value);
  const handleDepenseChange = (e) => setTextDepense(e.target.value);
  const handleMaterialAmountChange = (e) => setMaterialAmount(e.target.value);
  const handleDepreciationRateChange = (e) =>
    setDepreciationRate(e.target.value);

  return (
    <>
      {" "}
      {/* TABLEAU DE POSSESSSION */} <h1>PATRIMOINE</h1>
      <h2>Liste de Patrimoines</h2>
      <Table striped bordered hover className="text-center" variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Libelle</th>
            <th>Valeur initiale</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((item, index) => {
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
              <tr>
                <td>{index + 1}</td>
                <td>{item.libelle}</td>
                <td>{item.valeur}</td>
                <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
                <td>
                  {item.dateFin
                    ? new Date(item.dateFin).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {item.tauxAmortissement ? item.tauxAmortissement + "%" : "0%"}
                </td>
                <td>
                  {Math.round(actualValues).toLocaleString()}
                  <span> Ar</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
      {/* *************** GESTION PATRIMOINE ************************/}
      <h2 className="mt-4">Gestion de Patrimoines</h2>
      <div className="container">
        {/* CLASSE POSSESSEUR */}
        <div className="m-4 mb-3">
          <h5>POSSESSEUR</h5>
          <div className="mb-2">
            <label htmlFor="libelléPossesseur" className="form-label">
              Possesseur:
            </label>
            <input
              type="text"
              id="libelléPossesseur"
              className="form-control"
              value={textPossesseur}
              onChange={handlePossesseurChange}
              placeholder="Nom"
            />
          </div>
        </div>

        {/* CLASSE ARGENT */}
        <div className="m-4 mb-3">
          <h5>ARGENT</h5>
          <div className="mb-4">
            <DropdownButton
              id="dropdown-account-type"
              title={accountType}
              onSelect={handleAccountTypeChange}
            >
              <Dropdown.Item eventKey="Espèces">Espèces</Dropdown.Item>
              <Dropdown.Item eventKey="Compte Courant">
                Compte Courant
              </Dropdown.Item>
              <Dropdown.Item eventKey="Compte Epargne">
                Compte Épargne
              </Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="mb-2">
            <label htmlFor="cashAmountInput" className="form-label">
              Montant
            </label>
            <input
              type="number"
              id="cashAmountInput"
              className="form-control"
              value={cashAmount}
              onChange={handleCashAmountChange}
              placeholder="Entrez le montant"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="cashInterestInput" className="form-label">
              Intérêt
            </label>
            <input
              type="number"
              id="cashInterestInput"
              className="form-control"
              value={cashInterest}
              onChange={handleCashInterestChange}
              placeholder="Entrez le pourcentage"
            />
          </div>
        </div>

        {/* CLASSE BIEN MATERIEL */}
        <div className="m-4 mb-3">
          <h5>BIENS MATERIELS</h5>

          <div className="mb-2">
            <label htmlFor="libelléBienMateriels" className="form-label">
              Libellé
            </label>
            <input
              type="text"
              id="libelléBienMateriels"
              className="form-control"
              value={textBiensMateriel}
              onChange={handleBienChange}
              placeholder="Le nom du bien"
            />
          </div>

          <div className="mb-1">
            <label htmlFor="dateInput" className="form-label">
              Date mise en usage
            </label>
            <div className="mt-2">
              <DatePicker
                selected={acquisitionDate}
                onChange={(date) => setAcquisitionDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Choisir date"
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="materialAmountInput" className="form-label">
              Montant
            </label>
            <input
              type="number"
              id="materialAmountInput"
              className="form-control"
              value={materialAmount}
              onChange={handleMaterialAmountChange}
              placeholder="Entrez le montant"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="depreciationRateInput" className="form-label">
              Taux d'amortissement
            </label>
            <input
              type="number"
              id="depreciationRateInput"
              className="form-control"
              value={depreciationRate}
              onChange={handleDepreciationRateChange}
              placeholder="Entrez le pourcentage"
            />
          </div>
        </div>

        {/* CLASSE TRAIN DE VIE */}
        <div className="m-4 mb-3">
          <h5>TRAIN DE VIE</h5>
          <div className="mb-2">
            <label htmlFor="libelléTrainDeVie" className="form-label">
              Libellé
            </label>
            <input
              type="text"
              id="libelléTrainDeVie"
              className="form-control"
              value={textDepense}
              onChange={handleDepenseChange}
              placeholder="Dépenses"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="materialAmountInput" className="form-label">
              Montant
            </label>
            <input
              type="number"
              id="materialAmountInput"
              className="form-control"
              value={materialAmount}
              onChange={handleMaterialAmountChange}
              placeholder="Entrez le montant"
            />
          </div>
        </div>
        <button className="btn btn-success">Ajouter</button>
      </div>
    </>
  );
}

export default App;
