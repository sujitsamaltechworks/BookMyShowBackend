const {
    createMovieValidationSchema,
} = require('../lib/validators/movie.validation')
const Movie = require('../models/movies.model')

class MovieService {
    static async getAll() {
        const movies = await Movie.find({})
        return movies
    }

    static async createMovie(data) {
        const safeParsedData = await createMovieValidationSchema.safeParseAsync(
            data
        )

        if (safeParsedData.error) throw new Error(safeParsedData.error)

        return await Movie.create(safeParsedData.data)
    }

    static getById(id) {
        return Movie.findById(id)
    }
}

module.exports = MovieService
