const Film = require('../models/film.model.js');

//createFilm
const createFilm = async (req, res) => {
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
}

//getFilms
const getFilms = async (req, res) => {
	try {
		const films = await Film.find();
		return res.status(200).send(films);
	} catch (error) {
		return res.status(500).send('An error ocurred. Please try again or contact us.');
	}
}

//getFilmById
const getFilmById = async (req, res) => {
	try {
		const film = await Film.findById(req.params.id);
    return res.status(200).send(film);
	} catch (error) {
		return res.status(404).send('Id not found');
	}
}

//getFilmByTitle
const getFilmByTitle = async (req, res) => {
	try {
		const film = await Film.find({title: req.params.title});
      
    if (film.length == 0) {
      return res.status(404).send('Title not found');
    }
    
    return res.status(200).send(film);
	} catch (error) {
		return res.status(500).send('Internal server error');
	}
}

//getFilmByFilters
const getFilmByFilters = async (req, res) => {
	try {
		const {id, title, description, image_url, trailer_url} = req.query;
		const conditions = [];
		if(id) conditions.push({_id: id});
		if(title) conditions.push({title: {$regex: new RegExp(title, 'i')}});
		if(description) conditions.push({description: {$regex: new RegExp(description, 'i')}});
		if(image_url) conditions.push({image_url: {$regex: new RegExp(image_url, 'i')}});
		if(trailer_url) conditions.push({trailer_url: {$regex: new RegExp(trailer_url, 'i')}});
		const query = conditions.length > 0 ? {$or: conditions} : {};
		const film = await Film.find(query);

    if (film.length == 0) {
      return res.status(404).send('Movie not found. Try another filter');
    }
    
    return res.status(200).send(film);
	} catch (error) {
		return res.status(500).send('Internal server error');
	}
}

//updateFilm
const updateFilm = async (req, res) => {
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
}

//deleteFilm
const deleteFilm = async (req, res) => {
	try {
		const film = await Film.findByIdAndDelete(req.params.id);
    return res.status(200).send('Deleted Successfully');
	} catch (error) {
		return res.status(404).send('Unable to delete. Id not found.');
	}
}

module.exports = {
	createFilm,
	getFilms,
	getFilmById,
	getFilmByTitle,
	getFilmByFilters,
	updateFilm,
	deleteFilm
}