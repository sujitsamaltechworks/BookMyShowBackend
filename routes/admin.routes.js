const express = require('express')
const theatreController = require('../controllers/theatre.controller')
const movieController = require('../controllers/movie.controller')
const { restrictToRole } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(restrictToRole('admin'))

// theatre
router.get('/theatres', theatreController.getAllTheatres)
router.get('/theatres/:id', theatreController.getTheatreById)
router.post('/theatres', theatreController.createTheatre)
router.patch('/theatres')
router.delete('/theatres')
router.delete('/theatres/:id')

// threatre_halls
router.get(
    '/theatres/:theatreId/halls',
    theatreController.getTheatreHallsByTheatreId
)
router.post('/theatres/:theatreId/halls', theatreController.createTheatreHall)

// movies
router.get('/movies', movieController.getAllMovies)
router.get('/movies/:id', movieController.getMovieById)
router.post('/movies', movieController.createMovie)
router.patch('/movies')
router.delete('/movies')
router.delete('/movies/:id')

module.exports = router
