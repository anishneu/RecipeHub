import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import newsImg from '../images/genshin.jpg';
import { CheckCircle } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import API_BASE from '../api';

const News = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/news/create`, { title, description });
      setTitle('');
      setDescription('');
      setSavedMessage('Message broadcasted successfully');
    } catch (error) {
      console.error('Error submitting news:', error);
    }
  };

  return (
    <div className="rh-page--news" style={{ backgroundImage: `url(${newsImg})` }}>
      <div className="rh-auth-card" style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.9rem', margin: '0 0 0.35rem', textAlign: 'center', color: '#33691e' }}>
          Broadcast news
        </h1>
        <p style={{ textAlign: 'center', color: '#555', margin: '0 0 1.25rem' }}>
          Share updates and events with every chef and cook
        </p>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              backgroundColor: '#33691e',
              '&:hover': { backgroundColor: '#1b5e20' },
            }}
          >
            Send
          </Button>
        </form>
      </div>

      <Snackbar
        open={!!savedMessage}
        autoHideDuration={3000}
        onClose={() => setSavedMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: green[600],
            color: '#fff',
            borderRadius: '10px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CheckCircle sx={{ marginRight: '10px' }} />
          {savedMessage}
        </Box>
      </Snackbar>
    </div>
  );
};

export default News;
