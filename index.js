const mongoose = require('mongoose');
const config =  require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const planetsRouter = require('./routes/planets');
const homeRouter = require('./routes/home');
const express = require('express');
const app = express();

/*mongoose.connect('mongodb://192.168.99.100/hojetem', { useNewUrlParser: true })
    .then(() => console.log('Connected with MongoDB...'))
    .catch((err) => console.log('Coulkd not connect to MongoDB...')) */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));

app.use('/', homeRouter);
app.use('/api/planets', planetsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));