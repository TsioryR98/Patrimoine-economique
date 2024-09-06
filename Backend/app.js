import express from "express";
import { possessionRouter } from "./routes/possessionPost.js";
import { patrimoineRouter } from "./routes/patrimoinePost.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5001;
app.use(
  cors({
    origin: "https://patrimoine-backend-j6eo.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type, Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express running!");
});

app.use("/possession", possessionRouter);
app.use("/patrimoine", patrimoineRouter);

app.listen(port, () => {
  console.log(`appServer is running on ${port}`);
});
