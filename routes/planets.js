const auth = require('../middleware/auth');
const { Planet, validate } = require('../models/planet');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const planets = await Planet.find().sort('name');
    res.send(planets);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let planet = new Planet({
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
    });
    planet = await planet.save();
    res.send(planet);
});

router.get('/:id', async (req, res) => {
    const planet = await Planet.findById(req.params.id);
    if (!planet)
        res.status(404).send(`Planet not found ID: ${req.params.id}`);
    res.send(planet);
});

router.delete('/:id', async (req, res) => {
    const planet = await Planet.findByIdAndRemove(req.params.id);
    if (!planet)
        return res.status(404).send(`Planet not found ID: ${req.params.id}`);
    res.send(planet);
})

module.exports = router;