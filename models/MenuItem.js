const mongoose = require('mongoose');
const MenuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imageURL: {
        type: String,
        required: true
    },
    category: String,
    isAvailable: Boolean,
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);