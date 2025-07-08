import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostList({ user, onEdit }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/posts', { withCredentials: true });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, { withCredentials: true });
      setPosts(posts.filter(p => p.blog_id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  if (!user) {
    return null; // Don't render anything if not logged in
  }

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <div key={post.blog_id} style={{ border: '1px solid #ccc', marginBottom: '1em', padding: '1em' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>
            By {post.creator_name} on {new Date(post.date_created).toLocaleString()}
          </small>
          {user.user_id === post.creator_user_id && (
            <div>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => handleDelete(post.blog_id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
