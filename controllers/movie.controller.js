const { createMovieValidationSchema } = require('../lib/validators/movie.validation')
const MovieService = require('../services/movie.service')

async function getAllMovies(req, res) {
    const movies = await MovieService.getAll()

    return res.json({ data: movies })
}

async function createMovie(req, res) {
    const validationStatus = await createMovieValidationSchema.safeParseAsync(
        req.body
    )

    if (validationStatus.error) {
        return res.status(400).json({ error: validationStatus.error })
    }

    const { title, description, durationInMinutes, imageURL, language } =
        validationStatus.data

    const movie = await MovieService.createMovie({
        title,
        description,
        durationInMinutes,
        imageURL,
        language,
    })

    return res.status(201).json({ status: 'Success', data: movie })
}

async function getMovieById(req, res) {
    const movieId = req.params.id
    const movie = await MovieService.getById(movieId)

    if (!theatre)
        return res.status(400).json({
            status: 'error',
            message: `Movie not found with id ${movieId} `,
        })

    return res.status(200).json({ status: 'Success', data: movie })
}

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
}
