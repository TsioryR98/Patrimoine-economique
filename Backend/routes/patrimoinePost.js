import express from "express";
import path from "path";
import { readFile } from "../../data/index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataBasePath = path.join(__dirname, "../../data/data.json");

async function getPossessions() {
  const result = await readFile(dataBasePath);
  if (result.status === "OK") {
    return result.data
      .filter((item) => item.model === "Patrimoine")
      .map((item) => item.data.possessions)
      .flat();
  }
  return [];
}

// Get possession list
router.get("/", async (req, res) => {
  try {
    const possessions = await getPossessions();
    const filteredPossessions = possessions.filter(
      (possession) => possession.valeur > 0
    );
    res.status(200).json(filteredPossessions);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la lecture des données",
      error: error.message,
    });
  }
});

export const postRouter = router;
