const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db');
const signupRoutes = require('./signup');
const signinRoutes = require('./signin');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(signupRoutes);
app.use(signinRoutes);

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const [posts] = await db.query(
      'SELECT * FROM blogs ORDER BY date_created DESC'
    );
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new post (no auth)
app.post('/api/posts', async (req, res) => {
  const { title, body } = req.body;
  const user = { user_id: 'demo', name: 'Demo User' };

  try {
    const [result] = await db.query(
      'INSERT INTO blogs (creator_user_id, creator_name, title, body) VALUES (?, ?, ?, ?)',
      [user.user_id, user.name, title, body]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update post (no auth)
app.put('/api/posts/:id', async (req, res) => {
  const { title, body } = req.body;
  const user = { user_id: 'demo', name: 'Demo User' };

  try {
    await db.query(
      'UPDATE blogs SET title = ?, body = ? WHERE blog_id = ? AND creator_user_id = ?',
      [title, body, req.params.id, user.user_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete post (no auth)
app.delete('/api/posts/:id', async (req, res) => {
  const user = { user_id: 'demo', name: 'Demo User' };

  try {
    await db.query(
      'DELETE FROM blogs WHERE blog_id = ? AND creator_user_id = ?',
      [req.params.id, user.user_id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout (still here if you need it)
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

