const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const cars = require('./routes/cars');
const express = require('express');
const brands = require('./routes/brands');
const app = express();

mongoose.connect('mongodb://localhost/car', {
        useNewUrlParser: true,
        useFindAndModify: false //for the depecrated value for findoneandupdate
    })
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/cars', cars);
app.use('/api/brands', brands);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));