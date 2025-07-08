const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/api/signin', async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE user_id = ? AND password = ?',
      [user_id, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.user = {
      user_id: users[0].user_id,
      name: users[0].name,
    };

    res.json({ success: true, user: req.session.user });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

