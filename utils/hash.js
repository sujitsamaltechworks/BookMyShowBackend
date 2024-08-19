const crypto = require('crypto')

/**
 * @function hash
 * @param {string} data
 * @param {string} salt
 * @return {string} hashed value
 */
function hash(data, salt, algorithm = 'sha256') {
    return crypto.createHmac(algorithm, salt).update(data).digest('hex')
}

module.exports = {
    hash,
}
