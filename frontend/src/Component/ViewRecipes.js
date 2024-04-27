import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@mui/material';
import axios from 'axios';

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [cardContentMinWidth, setCardContentMinWidth] = useState('700px'); // Initial minWidth

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
        console.log(response.data);
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecipes();
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      // Dynamically adjust minWidth based on viewport width
      if (window.innerWidth < 700) {
        setCardContentMinWidth('100%');
      } else {
        setCardContentMinWidth('700px');
      }
    };

    window.addEventListener('resize', handleResize);

    // Initial call to handleResize to set minWidth on component mount
    handleResize();

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpen = (recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 4.2; // Default rating if no ratings are available
    }

    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    if (total === 0) {
      return 4.2; // Default rating if the total is zero
    }

    return (total / ratings.length).toFixed(1); // One decimal place
  };

  return (
    <Box textAlign="center" sx={{ mt: 8, mb: 5, ml: 14, mr: 14, minHeight: '100vh' }}>
      <Typography variant="poster" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'white', marginTop: '30px', marginBottom: '40px' }}>
        Your Recipes
      </Typography>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : error ? (
        <Typography variant="h6" color="error" sx={{ my: 5 }}>
          {error}
        </Typography>
      ) : recipes.length > 0 ? (
        <Box bgcolor="#f3e5f5" p={2} borderRadius={7}>
          <Grid container spacing={2}>
            {recipes.map((recipe) => (
              <Grid item xs={12} key={recipe._id}>
                <Card sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '160px', position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="100%" // Adjust the height of the image to fill the card
                    width="auto" // Let the width adjust to maintain aspect ratio
                    image={`http://localhost:5000/recipe/images/${recipe.creatorId}/${recipe.imagePath}`}
                    alt={recipe.name}
                    sx={{
                      objectFit: 'cover', // Stretch the image to cover the entire space
                      objectPosition: 'center', // Align the image to the left and top edges
                      borderRadius: '20px 0 0 20px', // Adjust border radius to match card's border radius
                      minWidth: '100px', // Ensure the image maintains minimum width
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: 0, left: 0, bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'yellow', padding: '4px', borderTopLeftRadius: '20px' }}>
                    <Typography variant="body2">
                      Rating: {calculateAverageRating(recipe.ratings)}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flex: '1', minWidth: cardContentMinWidth }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                      Ingredients: {recipe.ingredients.join(', ')}
                    </Typography>
                  </CardContent>
                  <Button size="small" color="success" sx={{ position: 'absolute', bottom: '5px', right: '5px' }} onClick={() => handleOpen(recipe)}>
                    Show More
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="h4" sx={{ my: 5 }}>
          No Recipes Found
        </Typography>
      )}
      {selectedRecipe && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>{selectedRecipe.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography gutterBottom>Ingredients: {selectedRecipe.ingredients.join(', ')}</Typography>
              <Typography gutterBottom>Description: {selectedRecipe.description}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ViewRecipes;

