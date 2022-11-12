require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// controllers
const AstronautController = require('./controllers/astronaut.controller');
const TeamController = require('./controllers/team.controller')

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/astronauts', AstronautController);
app.use('/api/v1/teams', TeamController)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
