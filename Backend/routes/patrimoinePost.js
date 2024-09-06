import express from "express";
import path from "path";
import { readFile, writeFile } from "../../data/index.js";
import { fileURLToPath } from "url";
import Flux from "../../UI/src/models/possessions/Flux.js";
import Possession from "../../UI/src/models/possessions/Possession.js";
import Patrimoine from "../../UI/src/models/Patrimoine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
const dataBasePath = path.join(__dirname, "../../data/data.json");

const handleError = (res, message, error) => {
  res.status(500).json({ message, error: error?.message || error });
};

const getDataBase = async () => {
  const dataBase = await readFile(dataBasePath);
  return dataBase.status === "OK" ? dataBase.data : null;
};

// ENDPOINT POST /range
router.post("/range", async (req, res) => {
  try {
    const { dateDebut, dateFin, type, jour } = req.body;

    if (!dateDebut || !dateFin || !type || !jour) {
      return res.status(400).json({ message: "Paramètres manquants" });
    }

    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: "Dates invalides" });
    }

    const data = await getDataBase();
    if (!data) {
      return handleError(res, "Données non trouvées");
    }

    const patrimoineData = data.find((d) => d.model === "Patrimoine");
    if (!patrimoineData) {
      return res.status(404).json({ message: "Modèle Patrimoine introuvable" });
    }

    const possessions = patrimoineData.data.possessions.map((p) => {
      return p.jour
        ? new Flux(
            p.possesseur,
            p.libelle,
            p.valeurConstante,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement,
            p.jour
          )
        : new Possession(
            p.possesseur,
            p.libelle,
            p.valeur,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement
          );
    });

    const patrimoine = new Patrimoine(
      patrimoineData.data.possesseur.nom,
      possessions
    );

    let currentDate = startDate;
    const results = [];

    while (currentDate <= endDate) {
      const valeur = patrimoine.getValeur(currentDate);
      results.push({ date: currentDate.toISOString().split("T")[0], valeur });

      if (type === "month") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + jour);
      }
    }

    res.json(results);
  } catch (error) {
    handleError(res, "Erreur lors de la récupération des données", error);
  }
});

export { router as patrimoineRouter };
