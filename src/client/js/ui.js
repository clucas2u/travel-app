export const showLoading = (element) => {
    element.innerHTML = 'Loading...';
};

export const hideLoading = (element) => {
    element.innerHTML = '';
};

export const showSpinner = (element) => {
    element.innerHTML = '<div class="spinner"></div>';
};

export const updateWeatherInfo = (element, data) => {
    if (Array.isArray(data)) {
        console.log("Received weather data:", data);  // Debugging line
        const forecastTemp = data.map(item => {
            if ('temp' in item && 'datetime' in item) {
                const date = new Date(item.datetime);
                const options = {day: '2-digit'};
                const formattedDate = date.toLocaleDateString('en-US', options);
                const dayOfWeek = date.toLocaleDateString('en-US', {weekday: 'short'});
                return `${dayOfWeek} ${formattedDate}: ${item.temp}°C`;
              } else {
                console.error("Temp property missing in item:", item);  // Debugging line
                return 'N/A';
            }
        }).join(', ');

        element.innerHTML = `Forecasted Tempratures: ${forecastTemp === '' ? 'Not available' : forecastTemp + '°C'}`;
        console.log("Current innerHTML of weather-info:", element.innerHTML);  // Debugging line
    } else {
        console.error("Data is not an array:", data);  // Debugging line
    }
};

export const updateLocationImage = (locationImage, imageData) => {
    console.log("Image data retrieved");  // Debugging line
    locationImage.src = imageData;
};

export const updateLocation = (element, location) => {
    element.innerHTML = `Location: ${location}`;
};

export const updateCountdown = (element, date) => {
    const today = new Date();
    const departureDate = new Date(date);
    const diffTime = Math.abs(departureDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    element.innerHTML = `${diffDays} days until your trip`;
};

// export const updateTripLength = (element, date) => {
    //const today = new Date();