import * as api from '../api';
import * as ui from '../ui';
import { calculateTripLength } from '../utils';
import { updateUI } from '../domManipulation';

// Mocking fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ someData: 'data' }),
    ok: true
  })
);

describe('app.js tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    fetch.mockClear();
  });

  it('fetches API keys on window load', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await window.dispatchEvent(new Event('load'));
    expect(jest.fn()).toHaveBeenCalledWith('/api-keys');
    spy.mockRestore();
  });

  it('handles form submit', async () => {
    // Mocking UI and API functions
    ui.showLoading = jest.fn();
    ui.hideLoading = jest.fn();
    api.fetchGeoData = jest.fn().mockResolvedValue({ geonames: [{ lat: 'someLat', lng: 'someLng' }] });
    api.fetchWeatherData = jest.fn().mockResolvedValue({ data: [{ temp: 'someTemp' }] });
    api.fetchImageData = jest.fn().mockResolvedValue({ hits: [{ webformatURL: 'someURL' }] });
    api.postTripData = jest.fn().mockResolvedValue({ message: 'success' });

    const form = { addEventListener: jest.fn() };
    document.getElementById = jest.fn().mockReturnValue(form);

    // Trigger form submit
    await form.addEventListener.mock.calls[0][1]({ preventDefault: jest.fn() });

    expect(ui.showLoading).toHaveBeenCalledTimes(2);
    expect(api.fetchGeoData).toHaveBeenCalled();
    expect(api.fetchWeatherData).toHaveBeenCalled();
    expect(api.fetchImageData).toHaveBeenCalled();
    expect(api.postTripData).toHaveBeenCalled();
    expect(ui.hideLoading).toHaveBeenCalledTimes(2);
  });
});