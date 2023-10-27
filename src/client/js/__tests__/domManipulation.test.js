import * as domManipulation from '../domManipulation';

// Mocking HTML elements
const mockElement = {};
document.getElementById = jest.fn(id => mockElement);

// Mock data
const mockGeoData = { locationName: 'Paris' };
const mockWeatherData = { temperature: '20°C' };
const mockImageData = { url: 'https://example.com/image.jpg' };
const mockTripLength = 5;

const mockData = {
  geoData: mockGeoData,
  weatherData: mockWeatherData,
  imageData: mockImageData,
  tripLength: mockTripLength
};

describe('updateUI function', () => {
  it('should update the UI with the provided data', () => {
    domManipulation.updateUI(mockData);

    expect(mockElement.innerText).not.toBeNull();
    expect(document.getElementById).toHaveBeenCalledWith('location');
    expect(document.getElementById).toHaveBeenCalledWith('weather');
    expect(document.getElementById).toHaveBeenCalledWith('image');
    expect(document.getElementById).toHaveBeenCalledWith('trip-length');
  });
});