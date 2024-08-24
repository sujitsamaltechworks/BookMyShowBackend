const {
    createTheatreValidationSchema,
    createTheatreHallSchema,
} = require('../lib/validators/theatre.validator')
const Theatre = require('../models/theatre.model')
const TheatreService = require('../services/theatre.service')

async function getAllTheatres(req, res) {
    const theatres = await TheatreService.getAll()

    return res.json({ data: theatres })
}

async function createTheatre(req, res) {
    const validationStatus = await createTheatreValidationSchema.safeParseAsync(
        req.body
    )

    if (validationStatus.error) {
        return res.status(400).json({ error: validationStatus.error })
    }

    const { name, plot, city, country, pinCode, state, street, lat, long } =
        validationStatus.data

    const theatre = await TheatreService.create({
        name,
        plot,
        city,
        country,
        pinCode,
        state,
        street,
        lat,
        long,
    })

    return res.status(201).json({ status: 'Success', data: theatre })
}

async function getTheatreById(req, res) {
    const theatreId = req.params.id
    const theatre = await TheatreService.getById(theatreId)

    if (!theatre)
        return res.status(400).json({
            status: 'error',
            message: `Theatre not found with id ${theatreId} `,
        })

    return res.status(200).json({ status: 'Success', data: theatre })
}

// Controller for halls
async function getTheatreHallsByTheatreId(req, res) {
    const theatreId = req.params.theatreId
    const halls = await TheatreService.getHallsByTheatreId(theatreId)
    return res.json({ status: 'success', data: halls })
}

async function createTheatreHall(req, res) {
    const validationResult = await createTheatreHallSchema.safeParseAsync(
        req.body
    )

    if (validationResult.error)
        return res.status(400).json({ error: validationResult.error })

    const hall = await TheatreService.createTheatreHall(validationResult.data)

    return res.json({ status: 'success', data: hall })
}

module.exports = {
    getAllTheatres,
    createTheatre,
    getTheatreById,
    getTheatreHallsByTheatreId,
    createTheatreHall,
}
