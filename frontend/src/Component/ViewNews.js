import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Pagination } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const ViewNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 4;
  const totalPageCount = Math.ceil(newsList.length / limit);

  useEffect(() => {
    document.body.style.backgroundColor = '#e57373';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news/getAll');
        setNewsList(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  const handleOpenDialog = (news) => {
    setSelectedNews(news);
  };

  const handleCloseDialog = () => {
    setSelectedNews(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedNewsList = newsList.slice(startIndex, endIndex);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'white', marginTop: '30px', marginBottom: '40px' }}>
        News & Updates <MailIcon />
      </Typography>
      <Box sx={{ backgroundColor: '#ffcdd2', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Grid container spacing={2}>
          {paginatedNewsList.map(news => (
            <Grid item xs={12} key={news._id}>
              <Card elevation={3} sx={{ maxHeight: '60px', borderRadius: '10px' }}>
                <CardContent onClick={() => handleOpenDialog(news)} sx={{ paddingTop: '15px', paddingBottom: '15px' }}>
                  <Typography variant="h6" sx={{fontSize: "1.2rem"}} gutterBottom>
                    {news.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Pagination count={totalPageCount} page={page} onChange={handlePageChange} color="success" />
        </Box>
      </Box>
      <Dialog open={selectedNews !== null} onClose={handleCloseDialog}>
        <DialogTitle>{selectedNews?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {selectedNews?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViewNews;
 