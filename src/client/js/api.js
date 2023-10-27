export const fetchGeoData = async (location, apiKey) => {
    console.log("fetchGeoData called");
    const url = `https://secure.geonames.org/searchJSON?q=${location}&maxRows=1&username=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch Geo data');
    return await response.json();
};

export const fetchWeatherData = async (latitude, longitude, apiKey) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.data) {
        return data.data;
    } else {
        throw new Error('Weather data not found');
    }
};

export const fetchImageData = async (location, apiKey) => {
    console.log("fetchImageData called")
    const url = `https://pixabay.com/api/?q=${location}&key=${apiKey}&image_type=photo&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL;  // Return the first image URL
    } else {
        throw new Error('No images found or API call failed');
    }
};