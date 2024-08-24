const AuthService = require('../services/auth.service')

function authenticationMiddleware(req, res, next) {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')) return next()

    //get the token
    const token = header.split(' ')[1]
    const userPayload = AuthService.decodeUserToken(token)

    if (userPayload) req.user = userPayload

    next()
}

function restrictToRole(role) {
    const roleAccessLevelMapping = {
        admin: 0,
        user: 9,
    }

    return function (req, res, next) {
        const user = req.user

        if (!user)
            res.status(403).json({
                error: 'You must be logged in to access this resource',
            })

        const userAccessLevel = roleAccessLevelMapping[user.role]

        const requiredAccessLevel = roleAccessLevelMapping[role]

        if (userAccessLevel > requiredAccessLevel) {
            return res.status(403).json({ error: 'Access Denied' })
        }

        next()
    }
}

module.exports = {
    authenticationMiddleware,
    restrictToRole,
}
