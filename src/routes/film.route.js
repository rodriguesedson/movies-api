const express = require('express');
const router = express.Router();
const {createFilm, getFilms,	getFilmById, getFilmByTitle,	getFilmByFilters,	updateFilm,	deleteFilm} = require('../controllers/film.controller.js');

//createFilm
router.post('/create', createFilm);
//getFilms
router.get('/', getFilms);
//getFilmById
router.get('/id/:id', getFilmById);
//getFilmByTitle
router.get('/title/:title', getFilmByTitle);
//getFilmByFilters
router.get('/filter/?', getFilmByFilters);
//updateFilm
router.put('/update/:id', updateFilm);
//deleteFilm
router.delete('/delete/:id', deleteFilm);

module.exports = router;