router.post('/', authenticateToken, async (req, res) => {
  const { milestone_id, content } = req.body;
  const user_id = req.user.id;

  const result = await pool.query(
    'INSERT INTO comments (milestone_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
    [milestone_id, user_id, content]
  );
  res.status(201).json(result.rows[0]);
});
