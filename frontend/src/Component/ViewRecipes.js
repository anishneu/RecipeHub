import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    document.body.style.backgroundColor = '#b39ddb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/recipe/creatorId/${userId}`);
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchRecipes();
  }, [userId]);

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 4.2;
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    if (total === 0) return 4.2;
    return (total / ratings.length).toFixed(1);
  };

  return (
    <div className="rh-page rh-page--chef">
      <div className="rh-page__inner">
        <h1 className="rh-section-title">Your recipes</h1>
        <p className="rh-section-sub">Dishes you have published on Recipe Hub</p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <CircularProgress sx={{ color: '#fff' }} />
          </div>
        ) : error ? (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center', my: 5 }}>
            {error}
          </Typography>
        ) : recipes.length > 0 ? (
          <div className="rh-panel rh-panel--chef">
            <div className="rh-tile-grid">
              {recipes.map((recipe) => (
                <article key={recipe._id || recipe.recipeId} className="rh-tile">
                  <div
                    className="rh-tile__media"
                    onClick={() =>
                      setExpandedId(expandedId === recipe.recipeId ? null : recipe.recipeId)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setExpandedId(expandedId === recipe.recipeId ? null : recipe.recipeId);
                      }
                    }}
                  >
                    <img
                      src={`http://localhost:5000/recipe/images/${recipe.creatorId}/${recipe.imagePath}`}
                      alt={recipe.name}
                    />
                  </div>
                  <div className="rh-tile__body">
                    <h3 className="rh-tile__title">{recipe.name}</h3>
                    <p className="rh-tile__meta">Rating {calculateAverageRating(recipe.ratings)}</p>
                    <div className="rh-tile__actions">
                      <Button
                        size="small"
                        onClick={() => handleOpen(recipe)}
                        sx={{
                          textTransform: 'none',
                          color: '#673ab7',
                          fontWeight: 600,
                          fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        Show more
                      </Button>
                    </div>
                  </div>
                  {expandedId === recipe.recipeId && (
                    <div className="rh-tile__details">
                      <p>{recipe.ingredients?.join(', ')}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : (
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'white', my: 5, fontFamily: 'Fraunces, Georgia, serif' }}>
            No recipes found
          </Typography>
        )}
      </div>

      {selectedRecipe && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Fraunces, Georgia, serif' }}>{selectedRecipe.name}</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <Typography gutterBottom>Ingredients: {selectedRecipe.ingredients.join(', ')}</Typography>
              <Typography gutterBottom>Description: {selectedRecipe.description}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ViewRecipes;
