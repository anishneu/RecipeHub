import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Pagination,
  Tab,
  Tabs,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#33691e' },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
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
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An unexpected error occurred');
      }
    };

    fetchData();
  }, [tabValue]);

  const handleDeleteUser = async (email) => {
    try {
      const response = await axios.delete('http://localhost:5000/user/delete', { data: { email } });
      if (response.status === 200) setUsers(users.filter((user) => user.email !== email));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteChef = async (email) => {
    try {
      const response = await axios.delete('http://localhost:5000/user/delete', { data: { email } });
      if (response.status === 200) setChefs(chefs.filter((chef) => chef.email !== email));
    } catch (err) {
      console.error('Error deleting chef:', err);
      setError('An unexpected error occurred');
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete('http://localhost:5000/recipe/delete', { data: { recipeId } });
      if (response.status === 200) setRecipes(recipes.filter((recipe) => recipe.recipeId !== recipeId));
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('An unexpected error occurred');
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 4.2;
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    if (total === 0) return 4.2;
    return (total / ratings.length).toFixed(1);
  };

  const displayUsers = users.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
  const displayChefs = chefs.slice((chefPage - 1) * itemsPerPage, chefPage * itemsPerPage);
  const displayRecipes = recipes.slice((recipePage - 1) * itemsPerPage, recipePage * itemsPerPage);

  const headerCell = { color: 'white', fontWeight: 600, fontFamily: 'Outfit, sans-serif' };

  return (
    <ThemeProvider theme={theme}>
      <div className="rh-page rh-page--admin">
        <div className="rh-page__inner">
          <h1 className="rh-section-title" style={{ color: '#33691e' }}>
            Manage
          </h1>
          <p className="rh-section-sub" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Users, chefs, and recipes across Recipe Hub
          </p>

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            centered
            sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
          >
            <Tab label="Users" />
            <Tab label="Chefs" />
            <Tab label="Recipes" />
          </Tabs>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <div className="rh-table-wrap">
            {tabValue === 0 && (
              <>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#33691e' }}>
                      <TableCell style={headerCell}>Full Name</TableCell>
                      <TableCell style={headerCell}>Email</TableCell>
                      <TableCell style={headerCell}>Recipes saved</TableCell>
                      <TableCell style={headerCell}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayUsers.map((user) => (
                      <TableRow key={user.email} hover>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.savedRecipes.length}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDeleteUser(user.email)} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={Math.ceil(users.length / itemsPerPage) || 1}
                  page={userPage}
                  onChange={(_, value) => setUserPage(value)}
                  color="primary"
                  sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
                />
              </>
            )}

            {tabValue === 1 && (
              <>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#33691e' }}>
                      <TableCell style={headerCell}>Full Name</TableCell>
                      <TableCell style={headerCell}>Email</TableCell>
                      <TableCell style={headerCell}>Recipes posted</TableCell>
                      <TableCell style={headerCell}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayChefs.map((chef) => (
                      <TableRow key={chef.email} hover>
                        <TableCell>{chef.fullName}</TableCell>
                        <TableCell>{chef.email}</TableCell>
                        <TableCell>{chef.myRecipe.length}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDeleteChef(chef.email)} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={Math.ceil(chefs.length / itemsPerPage) || 1}
                  page={chefPage}
                  onChange={(_, value) => setChefPage(value)}
                  color="primary"
                  sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
                />
              </>
            )}

            {tabValue === 2 && (
              <>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#006400' }}>
                      <TableCell style={headerCell}>Name</TableCell>
                      <TableCell style={headerCell}>Tags</TableCell>
                      <TableCell style={headerCell}>Ratings</TableCell>
                      <TableCell style={headerCell}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayRecipes.map((recipe) => (
                      <TableRow key={recipe.recipeId} hover>
                        <TableCell>{recipe.name}</TableCell>
                        <TableCell>{Array.isArray(recipe.tags) ? recipe.tags.join(', ') : recipe.tags}</TableCell>
                        <TableCell>{calculateAverageRating(recipe.ratings)}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="error" size="small" onClick={() => handleDeleteRecipe(recipe.recipeId)} sx={{ textTransform: 'none', borderRadius: '8px' }}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={Math.ceil(recipes.length / itemsPerPage) || 1}
                  page={recipePage}
                  onChange={(_, value) => setRecipePage(value)}
                  color="primary"
                  sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AllPages;
