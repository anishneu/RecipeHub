import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import API_BASE from '../api';

const textFieldStyles = {
  mb: 0.5,
  '& label.Mui-focused': { color: 'teal' },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&.Mui-focused fieldset': { borderColor: 'teal' },
  },
};

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE}/user/create`, { fullName, email, password, role });
      navigate('/Login');
      setError('Registration functionality not implemented yet.');
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="rh-page rh-page--auth">
      <div className="rh-auth-card">
        <h1>Sign up</h1>
        <p className="rh-auth-lead">Create your Recipe Hub account</p>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField
            type="text"
            label="Name"
            fullWidth
            margin="normal"
            autoFocus
            required
            value={fullName}
            sx={textFieldStyles}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            type="email"
            label="Email Address"
            fullWidth
            margin="normal"
            required
            value={email}
            sx={textFieldStyles}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            required
            value={password}
            sx={textFieldStyles}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="Confirm Password"
            fullWidth
            margin="normal"
            required
            value={confirmPassword}
            sx={textFieldStyles}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal" required sx={textFieldStyles}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="chef">Chef</MenuItem>
            </Select>
          </FormControl>
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Typography variant="body2" sx={{ mt: 2.5, textAlign: 'center', color: '#555' }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Register;
