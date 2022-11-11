const pool = require('../db/index');
const router = require('express').Router();

// GET api/v1/astronauts
router.get('/', async (req, res) => {
  try {
    const {rows: allAstronauts} = await pool.query(`SELECT * FROM astronaut`);
    return res.status(200).json(allAstronauts);
  } catch (err) {
    console.error(err.message);
  }
});

// POST api/v1/astronauts
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newAstronaut = await pool.query(`INSERT INTO astronaut (name) VALUES($1) RETURNING *`, [name]);
    return res.status(200).json(newAstronaut.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

// PUT api/v1/astronauts/:id
router.put('/:id', (req, res) => {});

// DELETE api/v1/astronauts/:id
router.delete('/:id', (req, res) => {});

module.exports = router;
