import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Pagination,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import API_BASE from '../api';

const ViewNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 4;
  const totalPageCount = Math.ceil(newsList.length / limit) || 1;

  useEffect(() => {
    document.body.style.backgroundColor = '#e57373';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/news/getAll`);
        setNewsList(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  const startIndex = (page - 1) * limit;
  const paginatedNewsList = newsList.slice(startIndex, startIndex + limit);

  return (
    <div className="rh-page rh-page--home">
      <div className="rh-page__inner" style={{ maxWidth: 720 }}>
        <h1 className="rh-section-title">
          News &amp; updates <MailIcon sx={{ verticalAlign: 'middle', ml: 0.5 }} />
        </h1>
        <p className="rh-section-sub">Announcements from the Recipe Hub team</p>

        <div className="rh-panel" style={{ background: '#ffcdd2' }}>
          {paginatedNewsList.length > 0 ? (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {paginatedNewsList.map((news) => (
                <button
                  key={news._id}
                  type="button"
                  onClick={() => setSelectedNews(news)}
                  style={{
                    textAlign: 'left',
                    border: 'none',
                    background: '#fff',
                    borderRadius: 10,
                    padding: '1rem 1.15rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    fontFamily: 'Fraunces, Georgia, serif',
                    fontSize: '1.15rem',
                    color: '#1a1a1a',
                  }}
                >
                  {news.title}
                </button>
              ))}
            </div>
          ) : (
            <Typography align="center" sx={{ py: 3 }}>
              No news yet.
            </Typography>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <Pagination count={totalPageCount} page={page} onChange={(_, value) => setPage(value)} color="success" />
          </div>
        </div>
      </div>

      <Dialog open={selectedNews !== null} onClose={() => setSelectedNews(null)}>
        <DialogTitle sx={{ fontFamily: 'Fraunces, Georgia, serif' }}>{selectedNews?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedNews?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedNews(null)} sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewNews;
