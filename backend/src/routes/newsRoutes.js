const express = require('express');
const router = express.Router();
const News = require('../models/HubNews');

router.post('/create', async (req, res) => {
  try {
    // Get the latest newsId
    const latestNews = await News.findOne({}, {}, { sort: { 'newsId': -1 } });
    const latestNewsId = latestNews ? latestNews.newsId : 0;
    const newsId = latestNewsId + 1;

    const { title, description } = req.body;
    const news = new News({ newsId, title, description });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const newsList = await News.find();
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
