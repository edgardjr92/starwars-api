const validateObjectId = require('./../middleware/validateObjectId');
const _ = require('lodash');
const { Planet, validate } = require('../models/planet');
const express = require('express');
const router = express.Router();
const swapi = require('../service/swapi');

router.get('/', async (req, res) => {
    const filter = req.query.name ? { name: req.query.name } : {};
    const result = await Planet.find(filter).sort('name').lean();
    let planets = await Promise.all(result.map(async (p) => {
        p.numberFilms =  await swapi.getQuantityMovies(p.name);
        return _.pick(p, ['_id', 'name', 'climate', 'terrain', 'numberFilms']);
    }));
    res.send(planets);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    let planet = await Planet.findOne({ name:req.body.name })

    if (planet)
        return res.status(400).send('Planet already registered.');
    planet = new Planet({
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
    });
    planet = await planet.save();
    res.send(planet);
});

router.get('/:id', validateObjectId, async (req, res) => {
    let planet = await Planet.findById(req.params.id).lean();

    if (!planet)
        res.status(404).send(`Planet not found ID: ${req.params.id}`);

    planet.numberFilms = await swapi.getQuantityMovies(planet.name);
    res.send(_.pick(planet, ['_id', 'name', 'climate', 'terrain', 'numberFilms']));
});

router.delete('/:id', validateObjectId,async (req, res) => {
    const planet = await Planet.findByIdAndRemove(req.params.id);
    if (!planet)
        return res.status(404).send(`Planet not found ID: ${req.params.id}`);
    res.send(planet);
})

module.exports = router;