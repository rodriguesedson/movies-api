const express = require('express');
const router = express.Router();
const Film = require('../models/film.model.js');
const {createFilm, getFilms,	getFilmById, getFilmByTitle,	getFilmByFilters,	updateFilm,	deleteFilm} = require('../controllers/film.controller.js');

//createFilm
router.post('/', createFilm);
//getFilms
router.get('/', getFilms);
//getFilmById
router.get('/:id', getFilmById);
//getFilmByTitle
router.get('/title/:title', getFilmByTitle);
//getFilmByFilters
router.get('/?*', getFilmByFilters);
//updateFilm
router.put(':id', updateFilm);
//deleteFilm
router.delete(':id', deleteFilm);

module.exports = router;