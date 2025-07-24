const express = require('express');
const { getAllItems, addItem } = require('../controllers/menuController');
const { testAddItem } = require('../controllers/menuController');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const MenuItem = require('../models/MenuItem');



const upload = multer({ storage });
const router = express.Router();


router.get('/test-add', testAddItem);
router.get('/menu', getAllItems);
router.post('/menu', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const imageURL = req.file?.path || req.file?.secure_url;
    console.log('🧾 req.body:', req.body);
    console.log('🖼 req.file:', req.file);


    const newItem = new MenuItem({
      name,
      description,
      category,
      price,
      imageURL,
      isAvailable: true
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/menu/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put('/menu/:id', async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


module.exports = router;