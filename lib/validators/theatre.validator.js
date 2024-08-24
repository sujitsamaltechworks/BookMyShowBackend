const { z } = require('zod')

const createTheatreValidationSchema = z.object({
    name: z.string().min(3).max(50),
    plot: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    lat: z.string().optional(),
    long: z.string().optional(),
    pinCode: z.number(),
})

module.exports = {
    createTheatreValidationSchema,
}
