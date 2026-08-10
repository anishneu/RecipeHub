import React, { useState, useEffect } from 'react';
import { Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import API_BASE from '../api';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [userId, setUserId] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#ffb74d';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    if (storedUserId) fetchSavedRecipes(storedUserId);
  }, []);

  const fetchSavedRecipes = async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/user/getSavedRecipes/${id}`);
      setSavedRecipes(response.data);
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`${API_BASE}/user/deleteSavedRecipe/${userId}`, {
        data: { recipeId },
      });
      fetchSavedRecipes(userId);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="rh-page rh-page--user">
      <div className="rh-page__inner">
        <h1 className="rh-section-title">Saved recipes</h1>
        <p className="rh-section-sub">Your favourites, ready whenever you are</p>

        <div className="rh-panel rh-panel--user">
          {savedRecipes.length > 0 ? (
            <div className="rh-tile-grid">
              {savedRecipes.map((recipe) => (
                <article key={recipe.recipeId} className="rh-tile">
                  <div
                    className="rh-tile__media"
                    onClick={() =>
                      setExpandedCardId(expandedCardId === recipe.recipeId ? null : recipe.recipeId)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setExpandedCardId(expandedCardId === recipe.recipeId ? null : recipe.recipeId);
                      }
                    }}
                  >
                    <img
                      src={`${API_BASE}/recipe/images/${recipe.creatorId}/${recipe.imagePath}`}
                      alt={recipe.name}
                    />
                  </div>
                  <div className="rh-tile__body">
                    <h3 className="rh-tile__title">{recipe.name}</h3>
                    <div className="rh-tile__actions">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteRecipe(recipe.recipeId)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                  {expandedCardId === recipe.recipeId && (
                    <div className="rh-tile__details">
                      <p>{recipe.description}</p>
                      <Typography component="p" sx={{ mt: 1, mb: 0.5, fontWeight: 600, color: '#1a1a1a' }}>
                        Ingredients
                      </Typography>
                      <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
              No saved recipes yet.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
