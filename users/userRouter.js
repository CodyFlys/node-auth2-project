
const express = require('express');

const helper = require('./user-model')

const router = express.Router();

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
    helper.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the users' });
    })
})

module.exports = router;