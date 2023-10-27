# Travel App

## Overview

This is a travel app that allows users to plan their trips by providing information about the destination, including the weather forecast and an image of the location. The app is built using HTML, CSS, and JavaScript, and it utilizes various APIs to fetch the required data.

## Features

- Search for a location and get weather forecasts for the upcoming week.
- View an image of the destination.
- Countdown to the departure date.
- Export trip details to a PDF.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/clucas2u/travel-app.git
   ```

2. Navigate to the project directory

   ```bash
   cd travel-app
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Create a `.env` file and add your API keys for Geonames, Weatherbit, and Pixabay.

5. Run the server

   ```bash
   npm start
   ```

## Usage

1. Open the app in your browser at `http://localhost:3000`
2. Enter the location and dates for your upcoming trip
3. Click on 'Get Info' to fetch the details
4. Click 'Export to PDF' to download a PDF of the trip details.

## Technologies Used

- HTML, CSS, JavaScript
- Node.js
- Express
- Various APIs (Geonames, Weatherbit, Pixabay)
- jsPDF for PDF generation

## Future Enhancements

- Add support for multiple destinations.
- Integrate more APIs for additional information like local attractions, restaurants, etc.
- Add user authentication.

## License

This project is licensed under the MIT License.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgments

- OpenWeatherMap API
- GeoNames API
- Pixabay API

---

Made with :heart: by Lisa