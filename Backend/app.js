import express from "express";
import { postRouter } from "./routes/patrimoinePost.js";
import cors from "cors";

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express running!");
});

app.use("/possession", postRouter);

app.listen(port, () => {
  console.log(`appServer is running on http://localhost:${port}`);
});
