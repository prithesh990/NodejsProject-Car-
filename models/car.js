const Joi = require('joi');
const mongoose = require('mongoose');
const {
    brandSchema
} = require('./brand');
//console.log("brand", brandSchema);
const carSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 500
    },
    brand: {
        type: brandSchema,
        required: true
    }
});



const Car = mongoose.model('Cars', carSchema);

export default objectWithVariables={
    carSchema,
    Car
};

function validateCar(car) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        brandId: Joi.objectId().required(),
        model: Joi.string().min(2).max(50).required(),
        price: Joi.string().min(5).max(10).required(),
        image: Joi.string().min(5).max(250).required(),
        description: Joi.string().min(5).max(500).required()

    };
    return Joi.validate(car, schema);
}
//console.log(Car);
//console.log(carSchema);
//exports.carSchema = carSchema;
//exports.Car = Car;

exports.validate = validateCar;