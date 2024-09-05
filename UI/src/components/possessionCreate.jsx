import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

//import Dropdown from "react-bootstrap/Dropdown";
//import DropdownButton from "react-bootstrap/DropdownButton";

const PatrimonyManagement = () => {
  const [textBiensMateriel, setTextBiensMateriel] = useState("");
  //const [textPossesseur, setTextPossesseur] = useState("");
  //const [textDepense, setTextDepense] = useState("");
  //const [accountType, setAccountType] = useState("Espèces");
  //const [cashAmount, setCashAmount] = useState("");
  //const [cashInterest, setCashInterest] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(null);
  const [materialAmount, setMaterialAmount] = useState("");
  const [depreciationRate, setDepreciationRate] = useState("");

  //const handleDepenseChange = (e) => setTextDepense(e.target.value);
  // const handleAccountTypeChange = (eventKey) => {setAccountType(eventKey);};
  //const handlePossesseurChange = (e) => setTextPossesseur(e.target.value);
  //const handleCashAmountChange = (e) => setCashAmount(e.target.value);
  //const handleCashInterestChange = (e) => setCashInterest(e.target.value);
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
      await axios.post("http://localhost:5001/possession/create", newInfo);
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
        {/* CLASSE POSSESSEUR 
        <div className="m-2 mb-3">
          <h5>POSSESSEUR</h5>
          <div className="mb-2">
            <label htmlFor="libelléPossesseur" className="form-label">
              Nom :
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
          */}

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

{
  /* CLASSE ARGENT 
        <div className="m-2 mb-3">
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
        */
}

{
  /* CLASSE TRAIN DE VIE 
        <div className="m-2 mb-3">
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
        */
}
