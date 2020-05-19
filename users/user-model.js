const db = require('../data/dbConfig');

function get(){
    return db('users')
}

module.exports = {
    get
}