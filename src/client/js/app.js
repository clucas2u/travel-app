import * as api from './api.js';
import * as ui from './ui.js';
import { calculateTripLength } from './utils.js';
import { updateUI } from './domManipulation.js';

let geonamesApiKey;
let weatherbitApiKey;
let pixabayApiKey;

window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api-keys');
        const data = await response.json();
        geonamesApiKey = data.geonamesApiKey;
        weatherbitApiKey = data.weatherbitApiKey;
        pixabayApiKey = data.pixabayApiKey;
        console.log("API Keys:", geonamesApiKey, weatherbitApiKey, pixabayApiKey);
        document.getElementById('export-pdf').addEventListener('click', generatePdf);
    } catch (error) {
        console.error('Error fetching API keys:', error);
    }
});

let imageData; // Declare imageData at a higher scope

async function generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const img = new Image();
    console.log("Image Data", imageData);
    img.setAttribute('https://pixabay.com/get/ge25228db9c06b2d5817d770b4f3695e9e933d17cae67ea1b91ce29ba80e7e0c07c410411a0da1a7a9c25cf7a84bc6c8d863a968413abc776e097edd18fb297e5_640.jpg', imageData); // Use the imageData variable
    await new Promise((resolve) => {
        img.onload = resolve;
    });
    doc.addImage(img, 10, 20, 50, 50);
    doc.text('Trip Info:', 10, 80);
    doc.fromHTML(document.getElementById('weather-info').outerHTML, 10, 85);
    doc.save('Your-Trip-Details.pdf');
}

const form = document.getElementById('travel-form');
const locationInput = document.getElementById('location');
const dateInput = document.getElementById('departure-date');
const weatherInfo = document.getElementById('weather-info');
console.log("Weather Info Element:", weatherInfo); 
const locationImage = document.getElementById('location-image');
const countdown = document.getElementById('countdown');
const locationDisplay = document.getElementById('location-display');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    ui.showLoading(weatherInfo);
    ui.showLoading(locationImage);

    try {
        const geoData = await api.fetchGeoData(locationInput.value, geonamesApiKey);
        const latitude = geoData.geonames[0].lat;
        const longitude = geoData.geonames[0].lng;

        ui.updateLocation(locationDisplay, locationInput.value);
        console.log('Location updated');

        const departureDate = dateInput.value;
        const returnDate = document.getElementById('return-date').value;
        const tripLength = calculateTripLength(departureDate, returnDate);
        
        const weatherData = await api.fetchWeatherData(latitude, longitude, weatherbitApiKey);
        if (weatherData && weatherData.length > 0) {
            const temperature = weatherData[0].temp;
            ui.updateWeatherInfo(weatherInfo, weatherData);
            console.log('Weather info updated');
        
            const tripData = {
                temperature: weatherData[0].temp,
                date: departureDate,
                userResponse: locationInput.value,
                tripLength: tripLength
            };
        } else {
            console.log('Weather data not found or rate limit reached');
        }

        const imageData = await api.fetchImageData(locationInput.value, pixabayApiKey);
        if (imageData) {
            console.log("About to update image with URL;", imageData);
            ui.updateLocationImage(locationImage, imageData);
            console.log('Image updated');
            generatePdf(imageData).catch(error => console.error("Error generating PDF:", error));
        } else {
            console.log('Image data not found');
        }
        
        ui.updateCountdown(countdown, dateInput.value);
        console.log('Countdown updated');

        }
    catch (error) {
        console.error("Error:", error);
        weatherInfo.innerHTML = 'An error occurred';
        locationImage.innerHTML = 'An error occurred';
    }
});