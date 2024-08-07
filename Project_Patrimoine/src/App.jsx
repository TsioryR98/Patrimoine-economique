import React, { useState } from 'react';
import './App.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstr     ap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepick      er/dist/react-datepicker.css';

export function App(props) {

const [textBiensMateriel, setTextBiensMateriel] = useState('');
const [textPossesseur, setTextPossesseur] = useState('');
const [textDepense, setTextDepense] = useState('');
//const [firstRowValues, setFirstRowValues] = useState(Array.from({ length: 6 }, () => ''));
const [accountType, setAccountType] = useState('Espèces');
const [cashAmount, setCashAmount] = useState('');
const [cashInterest, setCashInterest] = useState('');
const [acquisitionDate, setAcquisitionDate] = useState(null);
const [materialAmount, setMaterialAmount] = useState('');
const [depreciationRate, setDepreciationRate] = useState('');

/*const handleFirstRowInputChange = (index, value) => {
const newValues = [...firstRowValues];
newValues[index] = value;
setFirstRowValues(newValues);
};
*/ 

const handleAccountTypeChange = (eventKey) => {
setAccountType(eventKey);
};

// Fonctions onChange regroupées
const handlePossesseurChange = (e) => setTextPossesseur(e.target.value);
const handleCashAmountChange = (e) => setCashAmount(e.target.value);
const handleCashInterestChange = (e) => setCashInterest(e.target.value);
const handleBienChange = (e) => setTextBiensMateriel(e.target.value);
const handleDepenseChange = (e) => setTextDepense(e.target.value);
const handleMaterialAmountChange = (e) => setMaterialAmount(e.target.value);
const handleDepreciationRateChange = (e) => setDepreciationRate(e.target.value);

const handleSubmitArgent = () => {
// traiter l'ajout d'argent
};
const handleSubmitBienMateriel = () => {
//l'ajout d'un bien matériel
};
const handleSubmitTrainDeVie = () => {
//l'ajout d'une dépense
};

          return (<>
            
                <div className='m-4'>
          <h1>PATRIMOINE</h1>
               </div>
          
                <div className="container">
          
          {/* CLASSE POSSESSEUR */}
                <div className="m-4 mb-3">
          <h5>POSSESSEUR</h5>
                <div className="mb-2">
          <label htmlFor="libelléTrainDeVie" className="form-label">Possesseur:</label>
                <input 
                   type="text"
                  id="libelléTrainDeVie"
                  className="form-control"
                  value={textPossesseur}
                  onChange={handlePossesseurChange}
                  placeholder="Nom"
                  />
               </div>
          <button className="btn btn-success" onClick={handleSubmitTrainDeVie}>Ajouter</button>
               </div>
          
          {/* CLASSE ARGENT */}
                <div className="m-4 mb-3">
          <h5>ARGENT</h5>
                <div className="mb-4">
          <DropdownButton id="dropdown-account-type" 
          title={accountType} 
          onSelect={handleAccountTypeChange}>
          <Dropdown.Item eventKey='Espèces'>Espèces</Dropdown.Item>
          <Dropdown.Item eventKey='Compte Courant'>Compte Courant</Dropdown.Item>
          <Dropdown.Item eventKey='Compte Epargne'>Compte Épargne</Dropdown.Item>
          </DropdownButton>
               </div>
          
                <div className="mb-2">
          <label htmlFor="cashAmountInput" className="form-label">Montant</label>
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
          <label htmlFor="cashInterestInput" className="form-label">Intérêt</label>
          <input
          type="number"
          id="cashInterestInput"
          className="form-control"
          value={cashInterest}
          onChange={handleCashInterestChange}
          placeholder="Entrez le pourcentage"
          />
               </div>
          
          <button className="btn btn-success" onClick={handleSubmitArgent}>Ajouter</button>
               </div>
          
          {/* CLASSE BIEN MATERIEL */}
                <div className="m-4 mb-3">
          <h5>BIENS MATERIELS</h5>
          
                <div className="mb-2">
          <label htmlFor="libelléBienMateriels" className="form-label">Libellé</label>
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
          <label htmlFor="dateInput" className="form-label">Date mise en usage</label>
                <div className="mt-2">
          <DatePicker
          selected={acquisitionDate}
          onChange={(date) => setAcquisitionDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          />
               </div>
               </div>
          
                <div className="mb-2">
          <label htmlFor="materialAmountInput" className="form-label">Montant</label>
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
          <label htmlFor="depreciationRateInput" className="form-label">Taux d'amortissement</label>
          <input
          type="number"
          id="depreciationRateInput"
          className="form-control"
          value={depreciationRate}
          onChange={handleDepreciationRateChange}
          placeholder="Entrez le pourcentage"
          />
               </div>
          
          <button className="btn btn-success" onClick={handleSubmitBienMateriel}>Ajouter</button>
               </div>
          
          {/* CLASSE TRAIN DE VIE */}
                <div className="m-4 mb-3">
          <h5>TRAIN DE VIE</h5>
                <div className="mb-2">
          <label htmlFor="libelléTrainDeVie" className="form-label">Libellé</label>
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
          <label htmlFor="materialAmountInput" className="form-label">Montant</label>
          <input
          type="number"
          id="materialAmountInput"
          className="form-control"
          value={materialAmount}
          onChange={handleMaterialAmountChange}
          placeholder="Entrez le montant"
          />
               </div>
          
          <button className="btn btn-success" onClick={handleSubmitTrainDeVie}>Ajouter</button>
               </div>
               </div>
          </>
          );
          }
          
          export default App;
          