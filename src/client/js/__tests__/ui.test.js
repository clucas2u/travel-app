import * as ui from '../ui';

// Mock HTML element
const mockElement = { innerHTML: '' };

// Mock weather data
const mockWeatherData = { data: [{ temp: '25' }] };

// Mock image data
const mockImageData = { hits: [{ webformatURL: 'https://example.com/image.jpg' }] };

describe('UI functions', () => {

  test('showLoading updates innerHTML to Loading...', () => {
    ui.showLoading(mockElement);
    expect(mockElement.innerHTML).toBe('Loading...');
  });

  test('hideLoading clears innerHTML', () => {
    ui.hideLoading(mockElement);
    expect(mockElement.innerHTML).toBe('');
  });

  test('showSpinner updates innerHTML with spinner div', () => {
    ui.showSpinner(mockElement);
    expect(mockElement.innerHTML).toBe('<div class="spinner"></div>');
  });

  test('updateWeatherInfo updates innerHTML with temperature', () => {
    ui.updateWeatherInfo(mockElement, mockWeatherData);
    expect(mockElement.innerHTML).toBe('Temperature: 25°C');
  });

  test('updateImage updates innerHTML with image', () => {
    ui.updateImage(mockElement, mockImageData);
    expect(mockElement.innerHTML).toBe('<img src="https://example.com/image.jpg" alt="Location Image">');
  });

  test('updateCountdown updates innerHTML with countdown', () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 5);
    ui.updateCountdown(mockElement, futureDate.toISOString().split('T')[0]);
    expect(mockElement.innerHTML).toBe('5 days until your trip');
  });

});