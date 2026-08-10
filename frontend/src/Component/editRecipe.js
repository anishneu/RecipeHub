import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import API_BASE from '../api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    imagePath: '',
    tags: '',
    ingredients: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#d7ccc8';
    return () => {
      document.body.style.backgroundColor = '`;
    };
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/recipe/recipeId/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error(`Failed to fetch recipe details:', err.response ? err.response.data : err);
        setError('Failed to fetch recipe details`);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/recipe/edit`, recipe);
      navigate(`/ViewRecipes');
    } catch (err) {
      console.error('Failed to update recipe:', err);
      setError('Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !recipe.name) {
    return (
      <div className="rh-page rh-page--edit" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error && !recipe.name) {
    return (
      <div className="rh-page rh-page--edit">
        <Typography color="error" align="center">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="rh-page rh-page--edit">
      <div className="rh-auth-card" style={{ maxWidth: 520 }}>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.85rem', textAlign: 'center', margin: '0 0 1rem' }}>
          Edit recipe
        </h1>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={recipe.name} onChange={handleChange} margin="normal" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          <TextField fullWidth label="Description" name="description" value={recipe.description} onChange={handleChange} margin="normal" multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
          <TextField
            fullWidth
            label="Tags (comma-separated)"
            name="tags"
            value={Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags || ''}
            onChange={(e) => setRecipe({ ...recipe, tags: e.target.value.split(',') })}
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            fullWidth
            label="Ingredients (comma-separated)"
            name="ingredients"
            value={Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : ''}
            onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split(',') })}
            margin="normal"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
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
              backgroundColor: 'success.main',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            Update
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default EditRecipe;
