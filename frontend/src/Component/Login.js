import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess, loginFailure } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import API_BASE from '../api';

const fieldSx = {
  mb: 0.5,
  '& label.Mui-focused': { color: 'teal' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&.Mui-focused fieldset': { borderColor: 'teal' },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = '#b2dfdb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/user/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        const user = decodedToken.user;
        localStorage.setItem('userId', user.userId);
        const userRole = user.role;
        dispatch(loginSuccess(response.data.token, userRole));
        switch (userRole) {
          case 'user':
            navigate('/User');
            break;
          case 'chef':
            navigate('/Chef');
            break;
          case 'admin':
            navigate('/Admin');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid username or password.');
        dispatch(loginFailure('Invalid username or password.'));
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      dispatch(loginFailure('Invalid username or password.'));
    }
    setLoading(false);
  };

  return (
    <div className="rh-page rh-page--auth">
      <div className="rh-auth-card">
        <h1>Sign in</h1>
        <p className="rh-auth-lead">Welcome back to Recipe Hub</p>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            type="email"
            label="Email"
            fullWidth
            margin="normal"
            autoFocus
            required
            value={email}
            sx={fieldSx}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            required
            margin="normal"
            value={password}
            sx={fieldSx}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography component="p" color="error" sx={{ mt: 1.5, fontSize: '0.9rem' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2.5,
              py: 1.2,
              borderRadius: '8px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              backgroundColor: '#26a69a',
              '&:hover': { backgroundColor: '#009688' },
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center', color: '#555' }}>
            Don&apos;t have an account? <Link to="/Register">Sign up</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Login;
