import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function PossessionsTable() {
  const [listPossession, setListPossession] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPossession, setSelectedPossession] = useState({
    libelle: "",
    valeur: "",
    dateDebut: "",
    dateFin: "",
    tauxAmortissement: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/possession");
        const data = await response.json();
        setListPossession(data);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    window.open("/possession/create", "_blank", "noopener,noreferrer");
  };

  const handleClose = async (libelle) => {
    try {
      await axios.patch(`http://localhost:5000/possession/${libelle}/close`);
      setListPossession((lastListPossession) =>
        lastListPossession.map((possess) =>
          possess.libelle === libelle
            ? {
                ...possess,
                dateFin: new Date().toISOString(),
              }
            : possess
        )
      );
      alert("Possession clôturée");
    } catch (error) {
      console.error("Erreur lors de la clôture de la possession:", error);
      alert("Erreur lors de la clôture de la possession");
    }
  };

  const handleDelete = async (libelle) => {
    try {
      await axios.delete(`http://localhost:5000/possession/${libelle}`);
      setListPossession((lastListPossession) =>
        lastListPossession.filter((possess) => possess.libelle !== libelle)
      );
    } catch (error) {
      console.error("Error deleting possession:", error);
    }
  };

  const handleEdit = (possession) => {
    setSelectedPossession(possession);
    console.log("Editing possession:", possession);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPossession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler functions for specific fields
  const handleLibelleChange = (e) => {
    setSelectedPossession({ ...selectedPossession, libelle: e.target.value });
  };

  const handleValeurChange = (e) => {
    setSelectedPossession({ ...selectedPossession, valeur: e.target.value });
  };

  const handleDateDebutChange = (e) => {
    setSelectedPossession({ ...selectedPossession, dateDebut: e.target.value });
  };

  const handleDateFinChange = (e) => {
    setSelectedPossession({ ...selectedPossession, dateFin: e.target.value });
  };

  const handleTauxAmortissementChange = (e) => {
    setSelectedPossession({
      ...selectedPossession,
      tauxAmortissement: e.target.value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/possession/${selectedPossession.libelle}`,
        selectedPossession
      );
      setListPossession((lastListPossession) =>
        lastListPossession.map((possess) =>
          possess.libelle === selectedPossession.libelle
            ? { ...selectedPossession }
            : possess
        )
      );

      setShowEditModal(false);
      alert("Possession modifiée avec succès!");
      const response = await fetch("http://localhost:5000/possession");
      const data = await response.json();
      setListPossession(data);
    } catch (error) {
      console.error("Erreur lors de la modification de la possession:", error);
      alert("Erreur lors de la modification de la possession.");
    }
  };

  return (
    <>
      <div className="table-container p-4" style={{ fontSize: "18px" }}>
        <Link to="/">
          <div className="menu-back"></div>
        </Link>
        <h2> Possession List </h2>
        <div className="create-button">
          <Button variant="success" onClick={handleSubmit}>
            Create Patrimoine
          </Button>
        </div>
        <Table striped bordered hover className="text-center" variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Libelle</th>
              <th>Valeur initiale</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Amortissement</th>
              <th>valeurActuelle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listPossession.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{item.libelle}</td>
                <td>{item.valeur}</td>
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
                <td>{item.valeurActuelle}</td>
                <td className="text-center action">
                  <Button
                    variant="primary"
                    className="me-1"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="warning"
                    className="me-1"
                    onClick={() => handleClose(item.libelle)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="danger"
                    className="me-1"
                    onClick={() => handleDelete(item.libelle)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éditer la Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formLibelle">
              <Form.Label>Libellé</Form.Label>
              <Form.Control
                type="text"
                name="libelle"
                value={selectedPossession.libelle}
                onChange={handleLibelleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formValeur">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="number"
                name="valeur"
                value={selectedPossession.valeur}
                onChange={handleValeurChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateDebut">
              <Form.Label>Date de Début</Form.Label>
              <Form.Control
                type="date"
                name="dateDebut"
                value={selectedPossession.dateDebut.split("T")[0]}
                onChange={handleDateDebutChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateFin">
              <Form.Label>Date de Fin</Form.Label>
              <Form.Control
                type="date"
                name="dateFin"
                value={
                  selectedPossession.dateFin
                    ? selectedPossession.dateFin.split("T")[0]
                    : ""
                }
                onChange={handleDateFinChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaux">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="number"
                name="tauxAmortissement"
                value={selectedPossession.tauxAmortissement}
                onChange={handleTauxAmortissementChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
