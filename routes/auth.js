const joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email:req.body.email })

    if (!user)
        return res.status(400).send('Invalid email or password.');
    
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid)
        return res.status(400).send('Invalid email or password.');
    
    const token = user.generateAuthToken();

    res.send(token);
});

function validate(req) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(1024).required()
    };
    return result = joi.validate(req, schema);
}

module.exports = router;