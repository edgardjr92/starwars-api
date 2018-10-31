const request = require('request-promise-native');
const logger = require('../utils/logger');

async function getQuantityMovies(name) {
    const url = `http://swapi.co/api/planets/?search=${encodeURI(name)}`
    let films = 0;
    try {
        logger.log('info', `GET: ${url}`);

        const response = await request(`http://swapi.co/api/planets/?search=${encodeURI(name)}`);
        const results = JSON.parse(response).results;
        films = results.length ? results[0].films.length : films;
    } catch(e) {
        throw new Error(e);
    }
    return films;
}

module.exports.getQuantityMovies = getQuantityMovies;