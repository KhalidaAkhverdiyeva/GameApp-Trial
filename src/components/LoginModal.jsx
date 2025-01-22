import PropTypes from 'prop-types';
import { useState } from 'react';

const LoginModal = ({ onClose, setIsLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');
    if (username === storedUser && password === storedPass) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      onClose();
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignup = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Signup successful! You can now log in.');
    setIsSignup(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {isSignup ? (
          <button
            onClick={handleSignup}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
        <button
          onClick={onClose}
          className="ml-2 text-gray-700 px-4 py-2 rounded border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline"
          >
            {isSignup
              ? 'Already have an account? Login'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginModal;
