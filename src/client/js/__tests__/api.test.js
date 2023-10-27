import { fetchGeoData, fetchWeatherData, fetchImageData } from '../api';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ some: 'data' }),
  })
);

describe('API functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetchGeoData should fetch data correctly', async () => {
    const result = await fetchGeoData('New York', 'someApiKey');
    expect(result).toEqual({ some: 'data' });
    expect(fetch).toHaveBeenCalledWith('http://api.geonames.org/?q=New York&username=someApiKey');
  });

  it('fetchWeatherData should fetch data correctly', async () => {
    const result = await fetchWeatherData(40.7128, -74.0061, 'someApiKey');
    expect(result).toEqual({ some: 'data' });
    expect(fetch).toHaveBeenCalledWith('http://api.weatherbit.io/?lat=40.7128&lon=-74.0061&key=someApiKey');
  });

  it('fetchImageData should fetch data correctly', async () => {
    const result = await fetchImageData('New York', 'someApiKey');
    expect(result).toEqual({ some: 'data' });
    expect(fetch).toHaveBeenCalledWith('https://pixabay.com/api/?q=New York&key=someApiKey');
  });
});