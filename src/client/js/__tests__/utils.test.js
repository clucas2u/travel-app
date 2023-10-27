import { calculateTripLength } from '../utils';

// Test for calculateTripLength function

describe('calculateTripLength', () => {
  test('should correctly calculate the length of the trip in days', () => {
    const departureDate = '2023-11-01';
    const returnDate = '2023-11-10';
    const expected = 9;
    const result = calculateTripLength(departureDate, returnDate);
    expect(result).toBe(expected);
  });

  test('should return 0 if departure and return dates are the same', () => {
    const departureDate = '2023-11-01';
    const returnDate = '2023-11-01';
    const expected = 0;
    const result = calculateTripLength(departureDate, returnDate);
    expect(result).toBe(expected);
  });

  test('should return a negative number if return date is before departure date', () => {
    const departureDate = '2023-11-10';
    const returnDate = '2023-11-01';
    const expected = -9;
    const result = calculateTripLength(departureDate, returnDate);
    expect(result).toBe(expected);
  });
});