import express from "express";
import path from "path";
import { readFile, writeFile } from "../../data/index.js";
import { fileURLToPath } from "url";
import Flux from "../../UI/src/models/possessions/Flux.js";
import Possession from "../../UI/src/models/possessions/Possession.js";

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

// ENDPOINT GET
router.get("/", async (req, res) => {
  try {
    const data = await getDataBase();
    if (data) {
      const actualDay = new Date();
      const processedPossessions = data[1].data.possessions.map((item) => {
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

        const actualValue = possession.getValeur(actualDay);
        return {
          libelle: item.libelle,
          valeur: item.valeur,
          dateDebut: item.dateDebut,
          dateFin: item.dateFin ? item.dateFin : null,
          tauxAmortissement: item.tauxAmortissement,
          valeurActuelle: Math.round(actualValue),
        };
      });

      res.json(processedPossessions);
    } else {
      handleError(res, "Erreur de lecture des données");
    }
  } catch (error) {
    handleError(res, "Erreur lors de la lecture des données", error);
  }
});

//ENDPOINT POST
router.post("/", async (req, res) => {
  try {
    const newPossession = req.body;
    const data = await getDataBase();

    if (data) {
      data[1].data.possessions.push(newPossession);
      const writeInData = await writeFile(dataBasePath, data);
      if (writeInData.status === "OK") {
        res.status(201).json(newPossession);
      } else {
        handleError(
          res,
          "Erreur lors de l'écriture des données",
          writeInData.error
        );
      }
    } else {
      handleError(res, "Erreur de lecture des données");
    }
  } catch (error) {
    handleError(res, "Erreur lors de la lecture des données", error);
  }
});

//ENDPOINT POST /CREATE
router.post("/create", async (req, res) => {
  const { libelle, valeur, dateDebut, tauxAmortissement, possesseur } =
    req.body;
  try {
    const data = await getDataBase();

    if (data) {
      data[1].data.possessions.push({
        possesseur,
        libelle,
        valeur,
        dateDebut,
        dateFin: null,
        tauxAmortissement,
      });

      const dataWrite = await writeFile(dataBasePath, data);
      if (dataWrite.status === "OK") {
        res.status(201).json({ message: "Création OK", possession: req.body });
      } else {
        handleError(res, "Échec de l'écriture des données", dataWrite.error);
      }
    } else {
      handleError(res, "Échec de la lecture des données");
    }
  } catch (error) {
    handleError(res, "Erreur lors de la lecture des données", error);
  }
});

//ENDPOINT /:LIBELLE for update
router.put("/:libelle", async (req, res) => {
  try {
    const { libelle } = req.params;
    const { valeur, dateDebut, dateFin, tauxAmortissement } = req.body;
    const data = await getDataBase();

    if (data) {
      const possessionIndex = data[1].data.possessions.findIndex(
        (p) => p.libelle === libelle
      );

      if (possessionIndex !== -1) {
        const updatedPossession = {
          ...data[1].data.possessions[possessionIndex],
          valeur,
          dateDebut,
          dateFin: dateFin ? dateFin : null,
          tauxAmortissement,
        };
        data[1].data.possessions[possessionIndex] = updatedPossession;
        const writeStatus = await writeFile(dataBasePath, data);

        if (writeStatus.status === "OK") {
          res.status(200).json(updatedPossession);
        } else {
          handleError(res, "Erreur lors de l'enregistrement des modifications");
        }
      } else {
        res.status(404).json({ message: "Possession introuvable" });
      }
    } else {
      handleError(res, "Erreur de lecture des données");
    }
  } catch (error) {
    handleError(res, "Erreur lors de la mise à jour de la possession", error);
  }
});

// ENDPOINT DELETE /:libelle

router.delete("/:libelle", async (req, res) => {
  const { libelle } = req.params;

  try {
    const data = await getDataBase();
    if (!data) {
      return handleError(res, "Données non trouvées");
    }

    const patrimoine = data.find((item) => item.model === "Patrimoine");
    if (!patrimoine) {
      return handleError(res, "Modèle Patrimoine introuvable");
    }

    const possessions = patrimoine.data.possessions;
    const index = possessions.findIndex((p) => p.libelle === libelle);

    if (index !== -1) {
      possessions.splice(index, 1);

      const writeResult = await writeFile(dataBasePath, data);
      if (writeResult.status === "OK") {
        res.json({ message: "Possession supprimée avec succès" });
      } else {
        handleError(
          res,
          "Erreur lors de la sauvegarde des données",
          writeResult.error
        );
      }
    } else {
      res.status(404).json({ message: "Possession non trouvée" });
    }
  } catch (error) {
    handleError(res, "Erreur lors de la suppression de la possession", error);
  }
});

// ENDPOINT CLOSE
router.patch("/:libelle/close", async (req, res) => {
  const { libelle } = req.params;
  try {
    const data = await getDataBase();
    if (!data) {
      return handleError(res, "Données non trouvées");
    }
    const possession = data[1].data.possessions.find(
      (possess) => possess.libelle === libelle
    );
    possession.dateFin = new Date();
    await writeFile(dataBasePath, data);

    res.status(200).json({
      message: "Fermeture avec succès",
      possession: {
        ...possession,
        dateFin: possession.dateFin.toISOString(),
      },
    });
  } catch (error) {
    handleError(res, "Erreur lors de la fermeture", error);
  }
});

export { router as possessionRouter };
