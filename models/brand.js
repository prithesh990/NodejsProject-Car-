const Joi = require('joi');
const mongoose = require('mongoose');
// const {
//     carSchema
// } = require('./car');
import objectWithVariables from './car';
console.log(objectWithVariables);


const brandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255
    }
});

brandSchema.pre('remove', async function () {

    try {
        await carSchema.remove({
            "_id": {
                $in: this._id
            }
        });
    } catch (err) {
        console.log(err.message);
    }
});

const Brand = mongoose.model('Brand', brandSchema);

function validateBrand(brand) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5).max(250).required()

    };
    return Joi.validate(brand, schema);
}
exports.brandSchema = brandSchema;
exports.Brand = Brand;
exports.validate = validateBrand;