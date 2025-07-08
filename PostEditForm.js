import { useState } from 'react';
import axios from 'axios';

export default function PostEditForm({ post, onCancel, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(
        `http://localhost:3000/api/posts/${post.blog_id}`,
        { title, body },
        { withCredentials: true }
      );
      onUpdate();
    } catch (err) {
      console.error('Failed to update post:', err);
      setError(err.response?.data?.error || 'Failed to update post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

