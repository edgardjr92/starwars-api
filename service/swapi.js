const request = require('request-promise-native');
const logger = require('../utils/logger');

async function getQuantityMovies(name) {
    const url = `http://swapi.co/api/planets/?search=${encodeURI(name)}`
    logger.log('info', `GET: ${url}`);
    
    const response = await request(`http://swapi.co/api/planets/?search=${encodeURI(name)}`);
    const results = JSON.parse(response).results;
    const films = results.length ? results[0].films.length : 0;
    return films;
}

module.exports.getQuantityMovies = getQuantityMovies;