import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const PatrimonyManagement = () => {
  const [textBiensMateriel, setTextBiensMateriel] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(null);
  const [materialAmount, setMaterialAmount] = useState("");
  const [depreciationRate, setDepreciationRate] = useState("");

  const handleBienChange = (e) => setTextBiensMateriel(e.target.value);
  const handleMaterialAmountChange = (e) =>
    setMaterialAmount(Number(e.target.value));
  const handleDepreciationRateChange = (e) =>
    setDepreciationRate(Number(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInfo = {
      possesseur: { nom: "John Doe" },
      libelle: textBiensMateriel,
      valeur: materialAmount,
      dateDebut: acquisitionDate,
      tauxAmortissement: depreciationRate,
    };

    try {
      await axios.post(
        "https://patrimoine-backend-j6eo.onrender.com/possession/create",
        newInfo
      );
      alert("Possession créée avec succès!");
      window.close(); //fermeture de page creation apres create
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      alert("Erreur lors de la création de la possession.");
    }
  };

  return (
    <>
      <div className="mt-2 mb-4 justify-center text-center">
        <h2>Creation de Possession</h2>
      </div>
      <div className="container">
        <div className="m-2 mb-3">
          <h5>BIENS </h5>

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
              type="text"
              id="materialAmountInput"
              className="form-control"
              value={materialAmount}
              onChange={handleMaterialAmountChange}
              placeholder="Entrez le montant"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="depreciationRateInput" className="form-label">
              taux d'amortissement
            </label>
            <input
              type="text"
              id="depreciationRateInput"
              className="form-control"
              value={depreciationRate}
              onChange={handleDepreciationRateChange}
              placeholder="Entrez le pourcentage"
            />
          </div>
        </div>
        <Button className="btn btn-success" onClick={handleSubmit}>
          Valider possession
        </Button>
      </div>
    </>
  );
};

export default PatrimonyManagement;
