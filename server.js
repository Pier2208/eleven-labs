require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();

// controllers
const AstronautController = require('./controllers/astronaut.controller');
const TeamController = require('./controllers/team.controller');

// middlewares
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use('/api/v1/astronauts', AstronautController);
app.use('/api/v1/teams', TeamController);

app.use((err, req, res, next) => {
  console.log('ERROR', err)
  res.status(400).json(err)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
