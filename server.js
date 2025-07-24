require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = 'https://thingsandsomethingmenupage.netlify.app'

connectDB(); // ✅ MongoDB connection now handled here

app.use(cors({origin : allowedOrigin}));
app.use(express.json());
app.use(menuRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});