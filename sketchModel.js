/* Describing this file. */
const mongoose = require('mongoose');

const sketchSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'sketch.js',
    },
    isPrivate: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, //this means it automatically let you know when it was created and modified
})

//create a model from the user schema def to use it
const Sketch = mongoose.model('Sketch', sketchSchema);

module.exports = Sketch
