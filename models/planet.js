const joi = require('joi');
const mongoose = require('mongoose');

const Planet = mongoose.model('planet', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    climate: {
        type: String,
        required: true
    },
    terrain: {
        type: String,
        required: true
    }
}));

function validatePlanet(planet) {
    const schema = {
        name: joi.string().required(),
        climate: joi.string().required(),
        terrain: joi.string().required()
    };
    return result = joi.validate(planet, schema);
}

exports.Planet = Planet;
exports.validate = validatePlanet;
