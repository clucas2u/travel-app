// Function to calculate the length of the trip in days
export const calculateTripLength = (departureDate, returnDate) => {
  const depDate = new Date(departureDate);
  const retDate = new Date(returnDate);
  const diffTime = (retDate - depDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Function to capitalize first letter of each word
function capitalizeFirstLetterOfEachWord(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}