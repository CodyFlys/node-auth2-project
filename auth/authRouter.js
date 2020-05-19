const express = require('express');
const helper = require('./auth-model')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const restricted = require('./restricted-middleware');
// const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12)

    user.password = hash;

    helper.register(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post the user' });
        })
})

router.post('/login', (req, res, next) => {
    const {userName, password} = req.body

    helper.login(userName)
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: `Welcome ${user.userName}!, have a token...`, token});
                } else {
                  res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(err => {
            res.status(500).json({message: "error", err})
            console.log(err)
        })
})

function generateToken(user) {
    const payload = {
        sub: user.id, //who is this token about?
        userName: user.username,
        department: user.department,
        // ... other Data
    }
    // const secret = 'faowhfaopwfwapowaoprkapworkapwofs'
    const options = {
        expiresIn: '8h',
    }

    const token = jwt.sign(payload, secrets.jwtSecret, options)
    return token
}

module.exports = router;