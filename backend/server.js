// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Use CORS middleware
app.use(cors()); // Use port 4000 by default

// Mock weather data
const weatherData = require('./weatherdata.json');

// Endpoint to get weather data for a specific city
app.get('/weather', (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  const filteredData = weatherData[city];
  if (!filteredData) {
    return res.status(404).json({ error: 'City not Present' });
  }

  res.json(filteredData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from only this origin
  }));
  