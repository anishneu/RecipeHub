import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Box, Typography, Pagination, Tab, Tabs, createTheme, ThemeProvider } from '@mui/material';

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#33691e',
    },
  },
});

const AllPages = () => {
  const [users, setUsers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [chefPage, setChefPage] = useState(1);
  const [recipePage, setRecipePage] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const itemsPerPage = 5;

  useEffect(() => {
    document.body.style.backgroundColor = '#c5e1a5';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tabValue === 0) {
          const usersResponse = await axios.get(`http://localhost:5000/user/getAllUsers`);
          setUsers(usersResponse.data);
        } else if (tabValue === 1) {
          const chefsResponse = await axios.get(`http://localhost:5000/user/getAllChefs`);
          setChefs(chefsResponse.data);
        } else if (tabValue === 2) {
          const recipesResponse = await axios.get(`http://localhost:5000/recipe/getAll`);
          setRecipes(recipesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An unexpected error occurred');
      }
    };

    fetchData();
  }, [tabValue]);

  const handleDeleteUser = async (email) => {
    try {
      const response = await axios.delete('http://localhost:5000/user/delete', {
        data: { email }
      });
      if (response.status === 200) {
        setUsers(users.filter(user => user.email !== email));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteChef = async (email) => {
    try {
      const response = await axios.delete('http://localhost:5000/user/delete', {
        data: { email }
      });
      if (response.status === 200) {
        setChefs(chefs.filter(chef => chef.email !== email));
      }
    } catch (error) {
      console.error('Error deleting chef:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete('http://localhost:5000/recipe/delete', {
        data: { recipeId }
      });
      if (response.status === 200) {
        setRecipes(recipes.filter(recipe => recipe.recipeId !== recipeId));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleUserPageChange = (event, value) => {
    setUserPage(value);
  };

  const handleChefPageChange = (event, value) => {
    setChefPage(value);
  };

  const handleRecipePageChange = (event, value) => {
    setRecipePage(value);
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 4.2;
    }
  
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    if (total === 0) {
      return 4.2;
    }
  
    return (total / ratings.length).toFixed(1);
  };

  const displayUsers = users.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
  const displayChefs = chefs.slice((chefPage - 1) * itemsPerPage, chefPage * itemsPerPage);
  const displayRecipes = recipes.slice((recipePage - 1) * itemsPerPage, recipePage * itemsPerPage);

  return (
    <ThemeProvider theme={theme}> {/* Wrap your component tree with ThemeProvider and pass the theme */}
      <Box className="container" display="flex" flexDirection="column" justifyContent="top !important" height="80vh" marginTop='50px'>
        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} centered>
          <Tab label="Users" />
          <Tab label="Chefs" />
          <Tab label="Recipes" />
        </Tabs>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Box bgcolor="white" p={2} borderRadius={8} boxShadow={1} mt={2}>
          {tabValue === 0 && (
            <Box>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#33691e' }}>
                    <TableCell style={{ color: 'white' }}>Full Name</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Email</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Number of recipes saved</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Action</TableCell> {/* Set text color to white */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayUsers.map(user => (
                    <TableRow key={user.email}>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.savedRecipes.length}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeleteUser(user.email)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={Math.ceil(users.length / itemsPerPage)}
                page={userPage}
                onChange={handleUserPageChange}
                color="primary"
                size="large"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#33691e' }}>
                    <TableCell style={{ color: 'white' }}>Full Name</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Email</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Number of recipes posted</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Action</TableCell> {/* Set text color to white */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayChefs.map(chef => (
                    <TableRow key={chef.email}>
                      <TableCell>{chef.fullName}</TableCell>
                      <TableCell>{chef.email}</TableCell>
                      <TableCell>{chef.myRecipe.length}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeleteChef(chef.email)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={Math.ceil(chefs.length / itemsPerPage)}
                page={chefPage}
                onChange={handleChefPageChange}
                color="primary"
                size="large"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          )}
          {tabValue === 2 && (
            <Box>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: '#006400' }}> {/* Set background color to dark green */}
                    <TableCell style={{ color: 'white' }}>Name</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Tags</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Ratings</TableCell> {/* Set text color to white */}
                    <TableCell style={{ color: 'white' }}>Action</TableCell> {/* Set text color to white */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayRecipes.map(recipe => (
                    <TableRow key={recipe.recipeId}>
                      <TableCell>{recipe.name}</TableCell>
                      <TableCell>{recipe.tags}</TableCell>
                      <TableCell>{calculateAverageRating(recipe.ratings)}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeleteRecipe(recipe.recipeId)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                count={Math.ceil(recipes.length / itemsPerPage)}
                page={recipePage}
                onChange={handleRecipePageChange}
                color="primary"
                size="large"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AllPages;
