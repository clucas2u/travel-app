const request = require('supertest');
const app = require('../server'); // Import your server.js

// Mock environment variables
process.env.GEONAMES_API_KEY = 'test-geonames-key';
process.env.WEATHERBIT_API_KEY = 'test-weatherbit-key';
process.env.PIXABAY_API_KEY = 'test-pixabay-key';

// Initialize test data
let projectData = {};

// Test GET /all
describe('GET /all', () => {
  it('should return the projectData object', async () => {
    const res = await request(app).get('/all');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(projectData);
  });
});

// Test GET /api-keys
describe('GET /api-keys', () => {
  it('should return API keys', async () => {
    const res = await request(app).get('/api-keys');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      geonamesApiKey: 'test-geonames-key',
      weatherbitApiKey: 'test-weatherbit-key',
      pixabayApiKey: 'test-pixabay-key'
    });
  });
});

// Test POST /addTrip
describe('POST /addTrip', () => {
  it('should add trip information to projectData', async () => {
    const tripData = {
      temperature: 25,
      date: '2023-10-23',
      userResponse: 'New York',
      tripLength: 7
    };
    const res = await request(app).post('/addTrip').send(tripData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Trip information added successfully!');
    expect(projectData).toEqual(tripData);
  });
});

// Test POST /add
describe('POST /add', () => {
  it('should add data to projectData', async () => {
    const data = { key: 'value' };
    const res = await request(app).post('/add').send(data);
    expect(res.statusCode).toEqual(200);
    expect(projectData).toEqual(data);
  });
});