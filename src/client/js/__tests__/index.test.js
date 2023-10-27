import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';

global.navigator.serviceWorker = {
  register: jest.fn().mockResolvedValue({ scope: '/some-scope' })
};

global.console = {
  log: jest.fn(),
  error: jest.fn()
};

describe('Service Worker Registration', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should register service worker successfully', async () => {
    await import('./index');
    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/serviceWorker.js');
    expect(console.log).toHaveBeenCalledWith('Service Worker registered with scope:', '/some-scope');
  });

  test('should fail to register service worker', async () => {
    navigator.serviceWorker.register.mockRejectedValue(new Error('Failed to register'));
    await import('./index');
    expect(console.error).toHaveBeenCalledWith('Service Worker registration failed:', new Error('Failed to register'));
  });
});