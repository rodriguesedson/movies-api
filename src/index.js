const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

app.listen(port, async () => {
  console.log(`Server connected at port ${port}`);
  await mongoose.connect('mongodb://172.17.0.1:27017/test')
    .then(() => console.log('db connected'))
    .catch(() => console.error('db connection failed'))
});