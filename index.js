const http = require('http')
const mongoose = require('mongoose')
const expressServer = require('./app')

const PORT = process.env.PORT || 8000

async function init() {
    try {
        await mongoose.connect(
            `mongodb+srv://sujitsamaldev:UAM8ooBVvtQEfl9F@cluster0.wecbn.mongodb.net/moviebooking?retryWrites=true&w=majority&appName=Cluster0`
        )
        console.log(`MongoDB connected`)

        const server = http.createServer(expressServer)

        server.listen(PORT, () =>
            console.log(`Server started running on PORT:${PORT}`)
        )
    } catch (err) {
        console.log('Error starting server', err)
        process.exit(1)
    }
}

init()
