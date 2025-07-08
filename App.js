import './App.css'; 
import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import PostList from './PostList';
import PostForm from './PostForm';
import PostEditForm from './PostEditForm';

function App() {
  const [user, setUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (!user) {
    return (
      <div>
        {showSignup ? (
          <>
            <Signup />
            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <button onClick={() => setShowSignup(false)}>Sign In</button>
            </p>
          </>
        ) : (
          <>
            <Signin onLogin={setUser} />
            <p style={{ textAlign: "center" }}>
              Need an account?{" "}
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '1em' }}>
      <h1>Blog App</h1>
      <button
        onClick={() => {
          setUser(null);
          fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
          });
        }}
      >
        Log out
      </button>

      {editingPost ? (
        <PostEditForm
          post={editingPost}
          onCancel={() => setEditingPost(null)}
          onUpdate={() => {
            setEditingPost(null);
            setRefresh(!refresh);
          }}
        />
      ) : (
        <PostForm onPostCreated={() => setRefresh(!refresh)} />
      )}

      <PostList
        key={refresh}
        user={user}
        onEdit={(post) => setEditingPost(post)}
      />
    </div>
  );
}

export default App;
