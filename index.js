const mongoose = require('mongoose');
const config =  require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const planetsRouter = require('./routes/planets');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/starwars', { useNewUrlParser: true })
    .then(() => console.log('Connected with MongoDB...'))
    .catch((err) => console.log('Coulkd not connect to MongoDB...'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/planets', planetsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));