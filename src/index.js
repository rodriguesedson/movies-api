const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const filmRoute = require('./routes/film.route.js');

app.use(express.json());

app.use('/api/films/', filmRoute);

app.listen(port, async () => {
  console.log(`Server connected at port ${port}`);
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log('db connected');
  } catch (error) {
    console.error('db connection failed');
  }
});