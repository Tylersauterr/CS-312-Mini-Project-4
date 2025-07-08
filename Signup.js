import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({
    user_id: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post(
        'http://localhost:3000/api/signup',
        form,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSuccess(true);
        setForm({ user_id: '', password: '', name: '' });
      } else {
        setError('Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Signup failed.');
    }
  };

  return (
    <div>
      {success ? (
        <p style={{ textAlign: "center", color: "green" }}>
          Signup complete! You can now sign in.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            placeholder="User ID"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <button>Sign Up</button>
          {error && (
            <p className="error">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}


