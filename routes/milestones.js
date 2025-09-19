
const { authenticateToken } = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const pool = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM milestones');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, due_date, status } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO milestones (title, due_date, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, due_date, status || 'pending', user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating milestone:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id/review', authenticateToken, async (req, res) => {
  // review logic here
});


module.exports = router;
