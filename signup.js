const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/api/signup', async (req, res) => {
  const { user_id, password, name } = req.body;

  console.log('Signup received:', { user_id, password, name });

  try {
    const [existing] = await db.query(
      'SELECT * FROM users WHERE user_id = ?',
      [user_id]
    );

    if (existing.length > 0) {
      console.log('User already exists');
      return res.status(400).json({ error: 'User ID already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO users (user_id, password, name) VALUES (?, ?, ?)',
      [user_id, password, name]
    );

    console.log('User created:', result);

    res.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


