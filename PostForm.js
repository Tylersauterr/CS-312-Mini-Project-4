import { useState } from 'react';
import axios from 'axios';

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        'http://localhost:3000/api/posts',
        { title, body },
        { withCredentials: true }
      );
      setTitle('');
      setBody('');
      onPostCreated();
    } catch (err) {
      console.error('Failed to create post:', err);
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button>Create</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

