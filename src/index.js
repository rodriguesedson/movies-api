const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const Film = mongoose.model('Film', {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String
});

//use
app.use(express.json());

//post
app.post('/', async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  });
  await film.save();
  return res.send('Created successfully');
});

//get
app.get('/', async (req, res) => {
  const films = await Film.find();
  return res.send(films);
});

//get by id
app.get('/:id', async (req, res) => {
  const film = await Film.findById(req.params.id);
  return res.send(film);
});

//get by name
app.get('/:title', async (req, res) => {
  const film = await Film.findOne(req.params);
  return res.send(film);
})

//put
app.put('/:id', async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  }, {
    new: true
  });
  return res.send('Updated successfully');
});

//delete
app.delete('/:id', async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send('Deleted Successfully');
});

//listen
app.listen(port, async () => {
  console.log(`Server connected at port ${port}`);
  await mongoose.connect('mongodb://172.17.0.1:27017/test')
    .then(() => console.log('db connected'))
    .catch(() => console.error('db connection failed'))
});