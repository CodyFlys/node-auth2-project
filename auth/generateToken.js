const jwt = require('jsonwebtoken')

function generateToken(user) {
    const payload = {
        subject: user.id, //who is this token about?
        userName: user.username,
        department: user.department,
        // ... other Data
    }
    // const secret = 'faowhfaopwfwapowaoprkapworkapwofs'
    const options = {
        expiresIn: '8h',
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, options)
    return token
}

module.exports = {
    generateToken,
}