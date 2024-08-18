const { default: mongoose } = require('mongoose')

async function connectMongoDB(connectionURI) {
    return mongoose.connect(connectionURI)
}

exports.module = connectMongoDB
