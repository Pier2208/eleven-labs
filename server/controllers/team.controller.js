const router = require('express').Router();
const pool = require('../db/index');

// GET api/v1/teams
router.get('/', async (req, res, next) => {
  try {
    const { rows: allTeams } = await pool.query(`SELECT * FROM team`);

    if (allTeams.length) return res.status(200).json(allTeams);
  } catch (err) {
    console.error(err.message);
    next(err)
  }
});

// POST api/v1/teams
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newTeam = await pool.query(`INSERT INTO team (name) VALUES($1) RETURNING *`, [name]);

    if (newTeam) return res.status(200).json(newTeam.rows[0]);
  } catch (err) {
    console.error(err.message);
    next(err)
  }
});

module.exports = router;