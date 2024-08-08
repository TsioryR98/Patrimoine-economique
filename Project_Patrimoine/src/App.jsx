import React, { useState } from 'react';
import './App.css';
import Possession from '../../models/possessions/Possession';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';      
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import datas from "../../data/data1";
import Table from 'react-bootstrap/Table';
import 'react-datepicker/dist/react-datepicker.css';


export function App(props) {

const [textBiensMateriel, setTextBiensMateriel] = useState('');
const [textPossesseur, setTextPossesseur] = useState('');
const [textDepense, setTextDepense] = useState('');
const [accountType, setAccountType] = useState('Espèces');
const [cashAmount, setCashAmount] = useState('');
const [cashInterest, setCashInterest] = useState('');
const [acquisitionDate, setAcquisitionDate] = useState(null);
const [calculDate, setCalculDate] = useState(null);
const [materialAmount, setMaterialAmount] = useState('');
const [depreciationRate, setDepreciationRate] = useState('');
const [patrimoineFinal,setPatrimoineFinal] = useState(0);



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


return <> {/* TABLEAU DE POSSESSSION */}  <h1>PATRIMOINE</h1>

        <div className='container-fluid mt-4'>
            <h2>Liste de Patrimoines</h2>
            <Table striped bordered hover variant="ligth">
                    <thead>
                        <tr>
                            <th>Nom du Possesseur</th>
                            <th>Libellé</th>
                            <th>Valeur</th>
                            <th>Date Début</th>
                            <th>Date Fin</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Constante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((dataPossession, index) => {
                            return (
                                <tr key={index}>
                                    <td>{dataPossession.possesseur.nom}</td>
                                    <td>{dataPossession.libelle}</td>
                                    <td>{dataPossession.valeur}</td>
                                    <td>{new Date(dataPossession.dateDebut).toLocaleDateString()}</td>
                                    <td>{dataPossession.dateFin ? new Date(dataPossession.dateFin).toLocaleDateString() : 'N/A'}</td>
                                    <td>{dataPossession.tauxAmortissement !== null ? `${dataPossession.tauxAmortissement}%` : 'N/A'}</td>
                                    <td>{dataPossession.valeurConstante !== null ? dataPossession.valeurConstante : 'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table >
            </div>

                  <div>
                        <label htmlFor="selectDate">Sélectionner une date :</label>
                        <DatePicker
                              selected={calculDate}
                              onChange={(date) => setCalculDate   (date)}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              placeholderText='Choisir date'
                        />
                  </div>
                <div className='patrimoineValue mt-4'>
                     <input 
                        type="text"
                        id="libelléPossesseur"
                        className="form-control"
                        value={patrimoineFinal}
                        onChange={handlePossesseurChange}
                        placeholder="Nom"
                  />
                   <button className="btn btn-success mt-4" >Calculer la patrimoine</button>
               </div>

            <h2 className='mt-4'>Gestion de Patrimoines</h2>
                <div className="container">

                                      {/* CLASSE POSSESSEUR */}
            <div className="m-4 mb-3">
                  <h5>POSSESSEUR</h5>
                <div className="mb-2">
                        <label htmlFor="libelléPossesseur" className="form-label">Possesseur:</label>
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
                  <DropdownButton id="dropdown-account-type" 
                        title={accountType} 
                        onSelect={handleAccountTypeChange}>
                  <Dropdown.Item eventKey='Espèces'>Espèces</Dropdown.Item>
                  <Dropdown.Item eventKey='Compte Courant'>Compte Courant</Dropdown.Item>
                  <Dropdown.Item eventKey='Compte Epargne'>Compte Épargne</Dropdown.Item>
                  </DropdownButton>
               </div>
          
                <div className="mb-2">
          <             label htmlFor="cashAmountInput" className="form-label">Montant</label>
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
                   placeholderText='Choisir date'
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
          
               </div>
               <button className="btn btn-success" >Ajouter</button>
      </div>
 </>
 }
          
export default App;
                                