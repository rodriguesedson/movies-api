const Film = require('../models/film.model.js');
const MoviesEnum = require('../enums/Movies.Enum.js');

const createFilm = async (req, res) => {
	try {
		const film = new Film({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url
    });
    await film.save()
		//TODO: verify correct status code
    return res.status(200).send(MoviesEnum.createSuccess.message());
	} catch (error) {
		//TODO: verify correct status code
		return res.status(400).send(MoviesEnum.informationMissing.message());
	}
}

const getFilms = async (req, res) => {
	try {
		const films = await Film.find();
		//TODO: verify correct status code
		return res.status(200).send(films);
	} catch (error) {
		//TODO: verify correct status code
		return res.status(500).send(MoviesEnum.internalError.message());
	}
}

const getFilmById = async (req, res) => {
	try {
		const film = await Film.findById(req.params.id);
		//TODO: verify correct status code
    return res.status(200).send(film);
	} catch (error) {
		//TODO: verify correct status code
		//TODO: idNotFound
		return res.status(404).send('Id not found');
	}
}

const getFilmByTitle = async (req, res) => {
	try {
		const film = await Film.find({title: req.params.title});
      
    if (film.length == 0) {
			//TODO: verify correct status code
			//TODO: titleNotFound
      return res.status(404).send('Title not found');
    }
    //TODO: verify correct status code
    return res.status(200).send(film);
	} catch (error) {
		//TODO: verify correct status code
		return res.status(500).send(MoviesEnum.internalError.message());
	}
}

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
			//TODO: verify correct status code
			//TODO: notFound
			return res.status(404).send('Not found. Try another parameter');
    }
    //TODO: verify correct status code
    return res.status(200).send(film);
	} catch (error) {
		//TODO: verify correct status code
		return res.status(500).send(MoviesEnum.internalError.message());
	}
}

const updateFilm = async (req, res) => {
	try {
		const film = await Film.findByIdAndUpdate(req.params.id, {
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url
    }, {
      new: true
    });
		//TODO: verify correct status code
		//TODO: updateSuccess
    return res.status(200).send('Updated successfully');
	} catch (error) {
		//TODO: verify correct status code
		//TODO: idNotFound
		return res.status(404).send('Unable to update. Id not found');
	}
}

const deleteFilm = async (req, res) => {
	try {
		const film = await Film.findByIdAndDelete(req.params.id);
		//TODO: verify correct status code
		//TODO: deleteSuccess
    return res.status(200).send('Deleted Successfully');
	} catch (error) {
		//TODO: verify correct status code
		//TODO: idNotFound
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