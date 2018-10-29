require('express-async-errors');
const mongoose = require('mongoose');
const config =  require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const planetsRouter = require('./routes/planets');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const error = require('./middleware/error');
const express = require('express');
const app = express();


if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://192.168.99.100/starwars', { useNewUrlParser: true })
    .then(() => console.log('Connected with MongoDB...'))
    .catch((err) => console.log('Coulkd not connect to MongoDB...'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/planets', planetsRouter);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));