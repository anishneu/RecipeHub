import React, { useState, useEffect } from 'react';
import { Typography, Chip, IconButton, Button, Modal, Box, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import { Save, Star, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import API_BASE from '../api';

const RecipeList = () => {
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [userId, setUserId] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [rating, setRating] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    fetchRecipes();
    fetchUserId();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = '#ffb74d';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_BASE}/recipe/getAll`);
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchUserId = async () => {
    try {
      const storedUserId = localStorage.getItem('userId`);
      if (!storedUserId) return;
      const response = await axios.get(`${API_BASE}/user/getId/${storedUserId}`);
      if (response.data && response.data.userId) {
        setUserId(response.data.userId);
      }
    } catch (error) {
      console.error(`Error fetching user ID:', error);
    }
  };

  const updateRecentSearches = (newSearch) => {
    if (!recentSearches.includes(newSearch)) {
      setRecentSearches([newSearch, ...recentSearches].slice(0, 10));
    }
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue) performSearch();
  };

  const performSearch = () => {
    const keywordToAdd = inputValue.trim().toLowerCase();
    if (keywordToAdd && !keywords.includes(keywordToAdd)) {
      const newKeywords = [...keywords, keywordToAdd];
      setKeywords(newKeywords);
      filterRecipesWithKeywords(newKeywords);
      updateRecentSearches(keywordToAdd);
    }
    setInputValue('');
  };

  const handleKeywordDelete = (keywordToDelete) => () => {
    const newKeywords = keywords.filter((keyword) => keyword !== keywordToDelete);
    setKeywords(newKeywords);
    filterRecipesWithKeywords(newKeywords);
  };

  const filterRecipesWithKeywords = (nextKeywords) => {
    if (nextKeywords.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter((recipe) => isRecipeMatch(recipe, nextKeywords)));
    }
  };

  const isRecipeMatch = (recipe, nextKeywords) => {
    const recipeText = `${recipe.name.toLowerCase()} ${recipe.description.toLowerCase()}`;
    return nextKeywords.every((keyword) => recipeText.includes(keyword.toLowerCase()));
  };

  const handleRecentSearchClick = (search) => {
    if (!keywords.includes(search)) {
      const newKeywords = [...keywords, search];
      setKeywords(newKeywords);
      filterRecipesWithKeywords(newKeywords);
    } else {
      const filteredKeywords = keywords.filter((keyword) => keyword !== search);
      setKeywords(filteredKeywords);
      filterRecipesWithKeywords(filteredKeywords);
    }
    setInputValue('`);
  };

  const handleSaveRecipe = async (recipeId) => {
    try {
      if (!userId) return;
      await axios.post(`${API_BASE}/user/saveRecipe/${userId}`, { recipeId });
      setSavedMessage(`Recipe has been saved');
    } catch (error) {
      console.error('Error saving recipe:`, error);
    }
  };

  const handleOpenRatingModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setSelectedRecipe(null);
    setShowRatingModal(false);
  };

  const handleRatingChange = (event) => setRating(event.target.value);

  const handleRateRecipe = async () => {
    try {
      if (!userId || !selectedRecipe) return;
      await axios.put(`${API_BASE}/recipe/addRating/${selectedRecipe.recipeId}`, { rating });
      fetchRecipes();
      handleCloseRatingModal();
    } catch (error) {
      console.error(`Error rating recipe:', error);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 4.2;
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    if (total === 0) return 4.2;
    return (total / ratings.length).toFixed(1);
  };

  return (
    <div className="rh-page rh-page--user">
      <div className="rh-page__inner">
        <h1 className="rh-section-title">Recipe list</h1>
        <p className="rh-section-sub">Search by keyword, save favourites, and rate what you cook</p>

        <div className="rh-search">
          <input
            placeholder="Search keywords"
            aria-label="Search Keywords"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button type="button" onClick={performSearch}>
            Search
          </button>
        </div>

        {recentSearches.length > 0 && (
          <>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'white', mb: 1 }}>
              Recent searches
            </Typography>
            <div className="rh-chips">
              {recentSearches.map((search) => (
                <Chip
                  key={search}
                  label={search}
                  onClick={() => handleRecentSearchClick(search)}
                  sx={{ backgroundColor: 'white', color: 'black' }}
                />
              ))}
            </div>
          </>
        )}

        {keywords.length > 0 && (
          <div className="rh-chips">
            {keywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={handleKeywordDelete(keyword)}
                sx={{ backgroundColor: '#66bb6a', color: 'white' }}
              />
            ))}
          </div>
        )}

        {filteredRecipes.length > 0 ? (
          <div className="rh-panel rh-panel--user" style={{ marginTop: '1.5rem' }}>
            <div className="rh-tile-grid">
              {filteredRecipes.map((recipe) => (
                <article key={recipe.recipeId} className="rh-tile">
                  <div
                    className="rh-tile__media"
                    onClick={() =>
                      setExpandedCardId(expandedCardId === recipe.recipeId ? null : recipe.recipeId)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter`) {
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
                    <p className="rh-tile__meta">Rating {calculateAverageRating(recipe.ratings)}</p>
                    <div className="rh-tile__actions">
                      <IconButton aria-label="save" onClick={() => handleSaveRecipe(recipe.recipeId)} size="small">
                        <Save />
                      </IconButton>
                      <IconButton aria-label="rate" onClick={() => handleOpenRatingModal(recipe)} size="small">
                        <Star />
                      </IconButton>
                    </div>
                  </div>
                  {expandedCardId === recipe.recipeId && (
                    <div className="rh-tile__details">
                      <p>{recipe.description}</p>
                      <Typography component="p" sx={{ mt: 1, mb: 0.5, fontWeight: 600, color: `#1a1a1a' }}>
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
          </div>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'white', mt: 3 }}>
            No recipes match your search criteria.
          </Typography>
        )}
      </div>

      <Modal open={showRatingModal} onClose={handleCloseRatingModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '14px',
            padding: '1.75rem',
            minWidth: 280,
            boxShadow: '0 14px 36px rgba(0,0,0,0.12)',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Rate recipe
          </Typography>
          <Rating name="recipe-rating" value={Number(rating) || 0} precision={0.5} onChange={handleRatingChange} />
          <Button
            variant="contained"
            onClick={handleRateRecipe}
            sx={{
              mt: 2,
              display: 'block',
              backgroundColor: 'green',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

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

export default RecipeList;
