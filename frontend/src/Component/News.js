import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Snackbar } from '@mui/material';
import newsImg from '../images/genshin.jpg'; 
import { CheckCircle } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const News = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/news/create', { title, description });
      console.log('News submitted:', response.data);
      setTitle('');
      setDescription('');
      setSavedMessage('Message Broadcasted Successfully');
    } catch (error) {
      console.error('Error submitting news:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '92.2vh', // Set minimum height to full viewport height
        backgroundImage: `url(${newsImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', // Center the background image
        position: 'relative'
      }}
    >
      {/* Section Above with Image Background */}
      <Typography variant="poster" component="h1" gutterBottom sx={{ textAlign: 'left', color: 'white', marginTop: '80px', marginLeft: '90px', fontSize: '3rem' }}>
        Welcome to News!
      </Typography>

      {/* White Box with Form */}
      <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', margin: 'auto', maxWidth: '500px', marginTop: '40px' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px' }}>
            Share News and Updates with Everyone
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="success" // Change color to green
              fullWidth
              size="large"
              sx={{ mt: 2, '&:hover': { bgcolor: 'darkgreen' }, borderRadius: '8px', marginBottom: '10px' }} // Change hover color to dark green
            >
              Send
            </Button>
          </form>
        </Container>
      </Box>

      {/* Saved Message Snackbar */}
      <Snackbar
        open={!!savedMessage}
        autoHideDuration={3000}
        onClose={() => setSavedMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: green[600], // Use green color
            color: '#fff',
            borderRadius: '10px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '50px'
          }}
        >
          <CheckCircle sx={{ marginRight: '10px' }} />
          {savedMessage}
        </Box>
      </Snackbar>
    </Box>
  );
};

export default News;

