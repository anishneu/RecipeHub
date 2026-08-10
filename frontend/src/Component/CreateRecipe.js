import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import API_BASE from '../api';

const CreateRecipe = () => {
  const creatorId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    ingredients: '',
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const next = e.target.files[0];
    if (next) {
      setFile(next);
      setFileName(next.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creatorId) {
      setError('Please log in to create a recipe.');
      return;
    }

    const data = new FormData();
    data.append('image', file);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append('creatorId', creatorId);

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/recipe/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Recipe created successfully!');
      setFormData({ name: '', description: '', tags: '', ingredients: '' });
      setFile(null);
      setFileName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe.');
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
  };

  return (
    <div className="create-split">
      <aside
        className="create-split__visual"
        style={{ backgroundImage: `url(${API_BASE}/images/createRecipe.png)` }}
      >
        <div className="create-split__veil" />
        <h1 style={{ opacity: fadeIn ? 1 : 0 }}>Create recipe</h1>
      </aside>
      <section className="create-split__form">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 440 }}>
          <Typography
            component="h2"
            sx={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.85rem', mb: 2, color: '#673ab7' }}
          >
            New dish details
          </Typography>
          <TextField margin="normal" required fullWidth id="name" label="Recipe Name" name="name" autoFocus value={formData.name} onChange={handleChange} sx={fieldSx} />
          <TextField margin="normal" required fullWidth name="description" label="Description" multiline rows={4} value={formData.description} onChange={handleChange} sx={fieldSx} />
          <TextField margin="normal" required fullWidth name="ingredients" label="Ingredients" value={formData.ingredients} onChange={handleChange} sx={fieldSx} />
          <TextField margin="normal" required fullWidth name="tags" label="Tags" value={formData.tags} onChange={handleChange} sx={fieldSx} />
          {fileName && (
            <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
              Selected: {fileName}
            </Typography>
          )}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{
              mt: 2,
              mb: 1,
              textTransform: 'none',
              borderRadius: '8px',
              backgroundColor: '#673ab7',
              '&:hover': { backgroundColor: '#5e35b1' },
            }}
          >
            Upload image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {loading && <CircularProgress size={24} sx={{ display: 'block', mx: 'auto', my: 2 }} />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              backgroundColor: 'green',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            Create recipe
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </section>
      <style>{`
        .create-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          min-height: calc(100vh - 64px);
        }
        .create-split__visual {
          position: relative;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
        }
        .create-split__veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(103,58,183,0.45), rgba(0,0,0,0.45));
        }
        .create-split__visual h1 {
          position: relative;
          z-index: 1;
          font-family: Fraunces, Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          color: #fff;
          margin: 0;
          padding: 1.5rem;
          text-align: center;
          transition: opacity 1.2s ease;
        }
        .create-split__form {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background: linear-gradient(180deg, #f3e5f5, #fff);
        }
        @media (max-width: 900px) {
          .create-split { grid-template-columns: 1fr; }
          .create-split__visual { min-height: 240px; }
        }
      `}</style>
    </div>
  );
};

export default CreateRecipe;
