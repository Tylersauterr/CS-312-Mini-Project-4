import { useState } from 'react';
import axios from 'axios';

export default function Signin({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/signin', { user_id: userId, password });
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Signin failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Sign In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
