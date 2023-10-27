export const updateUI = ({ geoData, weatherData, imageData, tripLength }) => {
  // Update location
  document.getElementById('location').innerText = geoData.locationName;

  // Update weather
  document.getElementById('weather-info').innerText = weatherData.temperature;

  // Update image
  document.getElementById('location-image').innerText = imageData;

  // Update trip length
  document.getElementById('trip-length').innerText = `Trip Length: ${tripLength} days`;
};