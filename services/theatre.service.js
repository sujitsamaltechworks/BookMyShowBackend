const {
    createTheatreValidationSchema,
} = require('../lib/validators/theatre.validator')
const Theatre = require('../models/theatre.model')

class TheatreService {
    static async getAll() {
        const theatres = await Theatre.find({})
        return theatres
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
