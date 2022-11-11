require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db/index')

const app = express();

// controllers
const AstronautController = require('./controllers/astronaut.controller');

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/astronauts', AstronautController);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
