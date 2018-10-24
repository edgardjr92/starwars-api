const { Planet, validate } = require('../models/planet');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const planets = await Planet.find();
    res.send(planets);
});

router.get('/:id', (req, res) => {
    const planet = Planet.find(u => u.id == parseInt(req.params.id));
    if (!planet)
        res.status(404).send(`Planet not found ID: ${req.params.id}`);
    res.send(planet);
});

module.exports = router;