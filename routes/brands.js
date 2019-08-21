const {
    Brand,
    validate
} = require('../models/brand');
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const brands = await Brand.find().sort('name');
    res.send(brands);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let brand = new Brand({
        name: req.body.name,
        description: req.body.description
    });
    await brand.save();

    res.send(brand);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const brand = await Brand.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, {
        new: true
    });

    if (!brand) return res.status(404).send('The genre with the given ID was not found.');

    res.send(brand);
});
router.delete('/:id', async (req, res, next) => {
    Brand.findById(req.params.id, function (err, Brand) {
        if (err) return next(err);

        Brand.remove();
        res.send("success");
        // res.redirect("/cars");
    });




    // if (!brand) {
    //     return res.status(404).send('The brand with the given ID was not found.');
    // }
});
router.get('/:id', async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (!brand) return res.status(404).send('The brand with the given ID was not found.');

    res.send(brand);
});


module.exports = router;