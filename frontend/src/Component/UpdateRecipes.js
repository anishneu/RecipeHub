import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdateRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#b39ddb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) fetchRecipes(userId);
  }, []);

  const fetchRecipes = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/recipe/creatorId/${userId}`);
      setRecipes(response.data);
    } catch (err) {
      setSnackbarMessage('Failed to fetch recipes.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (recipeId) => {
    navigate(`/editRecipe/${recipeId}`);
  };

  const handleDeleteConfirmation = (recipe) => {
    setRecipeToDelete(recipe);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!recipeToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/recipe/delete`, {
        data: { recipeId: recipeToDelete.recipeId },
      });
      setSnackbarMessage('Recipe deleted successfully.');
      setRecipes(recipes.filter((recipe) => recipe.recipeId !== recipeToDelete.recipeId));
    } catch (err) {
      setSnackbarMessage('Failed to delete the recipe.');
      console.error(err);
    } finally {
      setDeleteConfirmOpen(false);
      setSnackbarOpen(true);
      const userId = localStorage.getItem('userId');
      if (userId) fetchRecipes(userId);
    }
  };

  return (
    <div className="rh-page rh-page--chef">
      <div className="rh-page__inner">
        <h1 className="rh-section-title">Manage recipes</h1>
        <p className="rh-section-sub">Edit or remove dishes from your collection</p>

        <div className="rh-panel rh-panel--chef">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <CircularProgress sx={{ color: '#673ab7' }} />
            </div>
          ) : recipes.length > 0 ? (
            <div className="rh-tile-grid">
              {recipes.map((recipe) => (
                <article key={recipe._id || recipe.recipeId} className="rh-tile">
                  <div className="rh-tile__media">
                    <img
                      src={`http://localhost:5000/recipe/images/${recipe.creatorId}/${recipe.imagePath}`}
                      alt={recipe.name}
                    />
                  </div>
                  <div className="rh-tile__body">
                    <h3 className="rh-tile__title" style={{ color: '#673ab7' }}>
                      {recipe.name}
                    </h3>
                    <div className="rh-tile__actions" style={{ gap: '0.5rem' }}>
                      <Button
                        size="small"
                        onClick={() => handleEdit(recipe.recipeId)}
                        sx={{
                          flex: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: '8px',
                          backgroundColor: '#673ab7',
                          color: '#fff',
                          fontFamily: 'Outfit, sans-serif',
                          '&:hover': { backgroundColor: '#5e35b1' },
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleDeleteConfirmation(recipe)}
                        sx={{
                          flex: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          borderRadius: '8px',
                          border: '1px solid #673ab7',
                          color: '#673ab7',
                          fontFamily: 'Outfit, sans-serif',
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              No recipes to manage yet.
            </Typography>
          )}
        </div>
      </div>

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          Are you sure you want to delete this recipe?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus sx={{ textTransform: 'none', color: '#673ab7' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default UpdateRecipes;
