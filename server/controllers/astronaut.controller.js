const router = require('express').Router();
const pool = require('../db/index');

// GET api/v1/astronauts
router.get('/', async (req, res) => {
  try {
    const { rows: allAstronauts } = await pool.query(`
    SELECT a.id as id, a.name as name, a.bio as bio, t.name as team 
    FROM astronaut as a 
    JOIN team as t ON a.team_id = t.id`);

    if (allAstronauts.length) return res.status(200).json(allAstronauts);
  } catch (err) {
    console.error(err.message);
  }
});

// GET api/v1/astronauts/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const astronaut = await pool.query(`
    SELECT a.id as id, a.name as name, a.bio as bio, t.name as team 
    FROM astronaut as a 
    JOIN team as t ON a.team_id = t.id 
    WHERE a.id = $1`,
      [id]
    );
    if (astronaut) return res.status(200).json(astronaut.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// PUT api/v1/astronauts/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, teamId } = req.body;
    const result = await pool.query(`UPDATE astronaut SET name = $1, bio = $2, teamId = $3 WHERE id = $4`, [name, bio, teamId, id]);

    if (result.rowCount > 0) return res.status(200).json({ success: 'Astronaute mis à jour!' });
  } catch (err) {
    console.error(err.message);
  }
});

// POST api/v1/astronauts
router.post('/', async (req, res) => {
  try {
    const { name, bio, teamId } = req.body;
    const newAstronaut = await pool.query(`INSERT INTO astronaut (name, bio, team_id) VALUES($1, $2, $3) RETURNING *`, [name, bio, teamId]);

    if (newAstronaut) return res.status(200).json(newAstronaut.rows[0]);
  } catch (err) {
    console.error(err.message);
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
