const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getAllItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new menu item
exports.addItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.testAddItem = async (req, res) => {
  const sampleItem = {
    name: 'Grilled Chicken Burger',
    description: 'Juicy grilled chicken with fresh lettuce and mayo',
    price: 7.99,
    imageURL: 'https://via.placeholder.com/150',
    category: 'Mains',
    isAvailable: true
  };

  try {
    const newItem = await MenuItem.create(sampleItem);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};