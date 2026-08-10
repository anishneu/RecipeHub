import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Box, TextField, Button, Typography, CircularProgress, Snackbar } from '@mui/material';

const Update = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  let email = null;
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    email = decodedToken.user.email;
  }

  useEffect(() => {
    document.body.style.backgroundColor = '#9fa8da';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) setFullName(storedFullName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.put('http://localhost:5000/user/edit', { email, fullName, password });
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again later.');
    }
    setLoading(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    navigate('/home');
  };

  return (
    <div className="rh-page rh-page--support">
      <div className="rh-auth-card">
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.85rem', textAlign: 'center', margin: '0 0 0.35rem', color: '#283593' }}>
          Update profile
        </h1>
        <p style={{ textAlign: 'center', color: '#555', margin: '0 0 1.25rem' }}>Keep your account details current</p>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="fullName"
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="New Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          {error && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 1,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              bgcolor: 'success.main',
              '&:hover': { bgcolor: 'darkgreen' },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
        </Box>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Details updated successfully"
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            OK
          </Button>
        }
      />
    </div>
  );
};

export default Update;
