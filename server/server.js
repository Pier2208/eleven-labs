require('dotenv').config();
const express = require('express');

const app = express();

const AstronautController = require("./controllers/astronaut.controller")

app.use("/api/v1/astronauts", AstronautController)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
