// Initialize an empty object to act as the app API endpoint
let projectData = {};

const express = require('express'); // Importing Express
const cors = require('cors'); // Importing CORS
const path = require('path'); // Import path module

const app = express(); // Initializing the Express application

const corsOptions = {
    origin: 'http://localhost:3000', // replace with application's origin
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

const port = 3000;

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join('src/client/views'))); // Serve HTML files
app.use('/styles', express.static(path.join('src/client/styles'))); // Serve CSS files
app.use(express.static(path.join('src/client'))); // Serve static files

// Serve JavaScript files
app.use('/js',express.static(path.join('src/client/js')));

// Add new route
app.get('/fetchGeoData', async (req, res) => {
    try {
      const response = await fetch(`https://secure.geonames.org/searchJSON?q=${req.query.q}&username=ctjambon`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Define the root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

require('dotenv').config();

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.get('/api-keys', (req, res) => {
    res.json({
        geonamesApiKey: process.env.GEONAMES_API_KEY,
        weatherbitApiKey: process.env.WEATHERBIT_API_KEY,
        pixabayApiKey: process.env.PIXABAY_API_KEY
    });
});

// POST route to add trip information to projectData
app.post('/addTrip', (req, res) => {
    const { temperature, date, userResponse, tripLength } = req.body;
    projectData = {
      temperature,
      date,
      userResponse,
      tripLength
    };
    res.send({ message: 'Trip information added successfully!' });
});

app.post('/add', (req, res) => {
    projectData = { ...req.body };
    res.send(projectData);
});
