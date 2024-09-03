const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const Schema = mongoose.Schema;
const filmSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  trailer_url: {
    type: String,
    required: true
  }
});
const Film = mongoose.model('Film', filmSchema);

//use
app.use(express.json());

//post
app.post('/', async (req, res) => {
  try {
    const film = new Film({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url
    });
    await film.save();
    return res.status(200).send('Created successfully');
  } catch (error) {
    return res.status(500).send('Creation failed');
  }
});

//get
app.get('/', async (req, res) => {
  const films = await Film.find();
  return res.send(films);
});

//get by id
app.get('/id/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    return res.status(200).send(film);
  } catch (error) {
    // return res.status(404).redirect('https://http.dog/404.jpg');
    return res.status(404).send('Id not found');
  }
});

//get by name
app.get('/title/:title', async (req, res) => {
  try {
    const film = await Film.find({title: req.params.title});
    if (film.length !== 0) {
      return res.status(200).send(film);
    } else {
      return res.status(404).send('Title not found');
    }
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
});

//put
app.put('/id/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, {
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url
    }, {
      new: true
    });
    return res.status(200).send('Updated successfully');
  } catch (error) {
    return res.status(404).send('Unable to update. Id not found');
  }
});

//delete
app.delete('/id/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.status(200).send('Deleted Successfully');
  } catch (error) {
    return res.status(404).send('Unable to delete. Id not found.');
  }
});

//listen
app.listen(port, async () => {
  console.log(`Server connected at port ${port}`);
  // await mongoose.connect('mongodb://localhost:27017')
  //   .then(() => console.log('db connected'))
  //   .catch(() => console.error('db connection failed'))
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log('db connected');
  } catch (error) {
    console.error('db connection failed');
  }
});