require('dotenv').config();
const router = require('express').Router();
const pool = require('../db/index');
const { Readable } = require('stream');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// middlewares
const joi = require('../middlewares/validate');
const { validate, schemas } = joi;
const { uploadSingle } = require('../middlewares/uploadFile');
const { read } = require('fs');

// GET api/v1/astronauts
router.get('/', async (req, res, next) => {
  try {
    const { rows: allAstronauts } = await pool.query(`
    SELECT a.id as id, a.name as name, a.bio as bio, t.name as team, i.url as avatar
    FROM astronaut as a 
    JOIN team as t ON a.team_id = t.id
    JOIN image as i ON a.image_public_id = i.public_id
    ORDER BY id DESC`);

    return res.status(200).json(allAstronauts);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// GET api/v1/astronauts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const astronaut = await pool.query(
      `
    SELECT a.name as name, a.bio as bio, t.id as teamId, i.url as avatar
    FROM astronaut as a 
    JOIN team as t ON a.team_id = t.id
    JOIN image as i ON a.image_public_id = i.public_id
    WHERE a.id = $1`,
      [id]
    );
    if (astronaut) return res.status(200).json(astronaut.rows[0]);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// PUT api/v1/astronauts/:id
router.put('/:id', uploadSingle(), validate(schemas.astronautSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio, teamId } = req.body;

    if (req.file) {
      // image upload
      const upload_stream = cloudinary.uploader.upload_stream({ folder: 'elevenlabs' }, async function (err, image) {
        if (err) {
          throw err;
        }

        const result = await pool.query(`INSERT INTO image(public_id, url) VALUES($1, $2) RETURNING public_id`, [image.public_id, image.url]);
        const imagePublicId = result.rows[0].public_id;

        await pool.query(`UPDATE astronaut SET name = $1, bio = $2, team_id = $3, image_public_id = $4 WHERE id = $5`, [name, bio, teamId, imagePublicId, id]);

        return res.status(200).json({ message: 'Astronaute mis à jour!', success: true });
      });
      const stream = Readable.from(req.file.buffer);
      stream.pipe(upload_stream);
    } else {
      await pool.query(`UPDATE astronaut SET name = $1, bio = $2, team_id = $3 WHERE id = $4`, [name, bio, teamId, id]);
      return res.status(200).json({ message: 'Astronaute mis à jour!', success: true });
    }
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// POST api/v1/astronauts
router.post('/', uploadSingle(), validate(schemas.astronautSchema), async (req, res, next) => {
  try {
    const { name, bio, teamId } = req.body;

    // image upload
    if (req.file) {
      const upload_stream = cloudinary.uploader.upload_stream({ folder: 'elevenlabs' }, async function (err, image) {
        if (err) {
          throw err;
        }

        const result = await pool.query(`INSERT INTO image(public_id, url) VALUES($1, $2) RETURNING public_id`, [image.public_id, image.url]);
        const imagePublicId = result.rows[0].public_id;

        await pool.query(
          `
          INSERT INTO astronaut (name, bio, team_id, image_public_id) 
          VALUES($1, $2, $3, $4) RETURNING *`,
          [name, bio, teamId, imagePublicId]
        );

        return res.status(200).json({ message: 'Astronaute ajouté!', success: true });
      });

      const stream = Readable.from(req.file.buffer);
      stream.pipe(upload_stream);
    } else {
      await pool.query(
        `
        INSERT INTO astronaut (name, bio, team_id, image_public_id) 
        VALUES($1, $2, $3, $4) RETURNING *`,
        [name, bio, teamId, 'elevenlabs/defaultuser']
      );

      return res.status(200).json({ message: 'Astronaute ajouté!', success: true });
    }
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// DELETE api/v1/astronauts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM astronaut WHERE id = $1`, [id]);

    return res.status(200).json({ message: 'Astronaute supprimé!', success: true });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
