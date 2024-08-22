const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express runnig !");
});

app.listen(PORT, () => {
  console.log(`patrimoineServer is running on http://localhost:${PORT}`);
});
