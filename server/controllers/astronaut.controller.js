const router = require('express').Router();
const pool = require('../db/index');

// GET api/v1/astronauts
router.get('/', async (req, res) => {
  try {
    const { rows: allAstronauts } = await pool.query(`SELECT * FROM astronaut`);

    if (allAstronauts.length) return res.status(200).json(allAstronauts);
  } catch (err) {
    console.error(err.message);
  }
});

// GET api/v1/astronauts/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const astronaut = await pool.query(`SELECT * FROM astronaut WHERE id = $1`, [id]);
    if (astronaut) return res.status(200).json(astronaut.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// PUT api/v1/astronauts/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(`UPDATE astronaut SET name = $1 WHERE id = $2`, [name, id]);

    if (result.rowCount > 0) return res.status(200).json({ success: 'Astronaute mis à jour!' });
  } catch (err) {
    console.error(err.message);
  }
});

// POST api/v1/astronauts
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newAstronaut = await pool.query(`INSERT INTO astronaut (name) VALUES($1) RETURNING *`, [name]);

    if (newAstronaut) return res.status(200).json(newAstronaut.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

// DELETE api/v1/astronauts/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM astronaut WHERE id = $1`, [id]);

    if (result.rowCount > 0) return res.json(200).json({ message: 'Astronaute supprimé!' });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
