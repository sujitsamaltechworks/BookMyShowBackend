const {
    createTheatreValidationSchema,
} = require('../lib/validators/theatre.validator')
const Theatre = require('../models/theatre.model')
const TheatreHall = require('../models/theatre-halls.model')

class TheatreService {
    static async getAll() {
        const theatres = await Theatre.find({})
        return theatres
    }

    static getHallsByTheatreId(id) {
        return TheatreHall.find({ theatreId: id })
    }

    static async createTheatreHall(data) {
        const validationResult = await createTheatreHallSchema.parseAsync(data)
        return TheatreHall.create(validationResult)
    }

    static async create(data) {
        const safeParsedData =
            await createTheatreValidationSchema.safeParseAsync(data)

        if (safeParsedData) {
            return await Theatre.create(safeParsedData.data)
        }
    }

    static getById(id) {
        return Theatre.findById(id)
    }
}

module.exports = TheatreService
