import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  TimeScale,
} from "chart.js";
import { registerables, Filler } from "chart.js";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "chartjs-adapter-date-fns";

ChartJS.register(...registerables, Filler);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Ajout de TimeScale pour les dates
);

export default function LineChart() {
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();
  const [jour, setJour] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    if (!dateDebut || !dateFin) {
      alert("Veuillez sélectionner les dates de début et de fin.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://patrimoine-economique-6jal.onrender.com/patrimoine/range",
        {
          dateDebut: dateDebut.toISOString().split("T")[0],
          dateFin: dateFin.toISOString().split("T")[0],
          type: "month",
          jour,
        }
      );
      const valeurs = response.data.map((item) => item.valeur);
      const dates = response.data.map((item) => item.date);

      setData({
        labels: valeurs,
        datasets: [
          {
            label: "Evolution",
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.2)",
            data: dates,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Une erreur est survenue lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  const defaultData = {
    labels: [0], // Valeur par défaut
    datasets: [
      {
        label: "Evaluation",
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        data: ["2023-01-01"], // Date par défaut
        fill: true,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center mb-4">Patrimoine Chart</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Date Debut:</label>
          <DatePicker
            selected={dateDebut}
            onChange={(date) => setDateDebut(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Selectionnez une date"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Date Fin:</label>
          <DatePicker
            selected={dateFin}
            onChange={(date) => setDateFin(date)}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            placeholderText="Selectionnez une date"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Jour:</label>
          <select
            value={jour}
            onChange={(e) => setJour(Number(e.target.value))}
            className="form-select"
          >
            {[1, 7, 30].map((day) => (
              <option key={day} value={day}>
                {day} jours
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button
          onClick={handleFetchData}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Valider"}
        </button>
      </div>
      <div className="chart-container">
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "linear", // Axe x linéaire pour les valeurs
                position: "bottom",
              },
              y: {
                type: "time", // Axe y pour les dates
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Date: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          }}
          data={data.labels ? data : defaultData}
        />
      </div>
    </div>
  );
}
