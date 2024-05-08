const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
