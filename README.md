# Weather Dashboard App

Welcome to the Weather Dashboard app! This application provides weather data for cities around the world. With a sleek and intuitive user interface, you can easily search for cities and access detailed weather information at your fingertips.

## Introduction

The Weather Dashboard app is built with React.js for the frontend and Node.js for the backend. It leverages a JSON file containing mock weather data for demonstration purposes Further for more detailed information of weather we have configured API using node JS. The frontend communicates with the backend API to fetch weather data based on user input.The frontend application automatically updates results when the user starts typing in the input field "citySearch" with at least 2 letters.

## Features

- **City Search:** Seamlessly search for cities by typing in the search bar. The application suggests city names based on your input, making it easy to find the desired location.

- **Detailed Weather Information:** View detailed weather information for the selected city, including current weather conditions and a 5-day weather forecast. The application displays weather descriptions and predictions, helping you plan your activities accordingly.

- **Interactive UI:** Experience an interactive user interface that allows you to expand weather cards for more details. Each card provides comprehensive weather data, making it easy to stay informed about the weather conditions.

## Preview

### Step 1: Dashboard View

![Dashboard View](screenshots/Home-Dashboard.png)

This is the main dashboard view of the Weather Dashboard application. Here, you can see the search bar where you can input the city name to fetch weather data.

### Step 2: Searching for a City

![Searching for a City](screenshots/Search.png)

When you start typing in the search bar, the application suggests city names based on your input. In this screenshot, the user is searching for "Lon" and the application suggests "London". Once the user selects a city, the weather data for that city is fetched from the JSON file.

### Step 3: Expanded Card View

![Expanded Card View](screenshots/Expand search.png)

After selecting a city, the weather card expands to show more details. Here, you can see the weather description and the weather forecast for the next 5 days. This information is fetched from the backend API endpoint `localhost:4000/weather?city={cityName}`.

## Getting Started

To run the application locally, follow the instructions provided in the previous section.

...


## Getting Started

To run the application locally using Docker Compose, follow these steps:

### Prerequisites

- Docker Desktop: [Download](https://www.docker.com/products/docker-desktop)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

### Starting Docker Containers:

docker-compose up -d


Additional Information:
The mock weather data is fetched from the endpoint http://localhost:4000/weatherdata.json.
The Weather data with specific city is fetched by this endpoint http://localhost:4000/weather?city=London

