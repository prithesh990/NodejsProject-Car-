const {
    Car,
    validate
} = require('../models/car');
const {
    Brand
} = require('../models/brand');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const cars = await Car.find().sort('name');
    res.send(cars);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const brand = await Brand.findById(req.body.brandId);
    if (!brand) return res.status(400).send('Invalid brand.');

    const car = new Car({
        name: req.body.name,
        brand: {
            _id: brand._id,
            name: brand.name
        },
        model: req.body.model,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });
    await car.save();
    res.send(car);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const brand = await Brand.findById(req.body.brandId);
    if (!brand) return res.status(400).send('Invalid brand.');

    const car = await Car.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        brand: {
            _id: brand._id,
            name: brand.name
        },
        model: req.body.model,
        price: req.body.price,
        description: req.body.description
    }, {
        new: true
    });
    if (!car) return res.status(404).send('The car with the given ID does not present');
    res.send(car);
});

router.delete('/:id', async (req, res) => {

    const car = await Car.findByIdAndRemove(req.params.id);
    if (!car) return res.status(404).send('The car with the given ID does not present');
    res.send(car);
});

router.get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).send('The car with the given ID was not found.');

    res.send(car);
});

module.exports = router;