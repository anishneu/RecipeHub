import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Box, TextField, Button, Typography, Container, CircularProgress, Snackbar } from '@mui/material';

const Update = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    let email = null;
    const token =  localStorage.getItem('token');
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

        if (storedFullName) {
            setFullName(storedFullName);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {

            await axios.put('http://localhost:5000/user/edit', { email, fullName, password });
            setOpenSnackbar(true); // Open the Snackbar on success
            // Reset the form here if needed
        } catch (error) {
            setError(error.response?.data?.message || 'An unexpected error occurred. Please try again later.');
        }
        setLoading(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Close the Snackbar
        navigate('/home'); // Navigate after closing the Snackbar
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        padding: '40px',
                    }}
                >
                    <Typography variant="poster" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'black', marginTop: '40px', marginBottom: '40px' }}>
                        Update Profile
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'success.main', color: 'white', '&:hover': {bgcolor: 'darkgreen'} }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
                        </Button>
                    </form>
                </Box>
            </Box>
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
        </Container>
    );
};

export default Update;
