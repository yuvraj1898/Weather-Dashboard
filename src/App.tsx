  import React, { useState, useEffect } from 'react';
  import WeatherCard from './WeatherCard';
  import './css/App.css'; 

  interface WeatherData {
    temperature: string;
    humidity: string;
    windSpeed: string;
  }

  function App(): JSX.Element {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>('');
    const [cityname, setCityName] = useState<string>('');

    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch('/weatherdata.json');
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          
          const data: Record<string, WeatherData> = await response.json();
          const filteredCities = Object.keys(data).filter((cityName) =>
            cityName.toLowerCase().startsWith(city.toLowerCase()) || 
          cityName.replace(/\s/g, '').toLowerCase().startsWith(city.toLowerCase())
          );

          setCityName(filteredCities[0]);
          if (filteredCities.length > 0) {
            setWeather(data[filteredCities[0]]);
            setError('');
          } else {
            setWeather(null);
            setError('City not found.');
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Failed to fetch weather data');
        }
      };

      if (city.trim().length >= 2) {
        fetchWeatherData();
      } else {
        setWeather(null);
        setError('');
      }
    }, [city]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setCity(e.target.value);
    };
    const handleSearchClick = () => {
      // Reset card state if expanded
      setWeather(null);
      setError('');
    };
    return (
      <div className="app-container" >
        <h1 className="app-name">
                 How's the Weather?
              </h1>
        <div className="search-container" >
          <input
            type="text"
            id="citySearch"
            className="city-search"
            placeholder="Search for a city..."
            value={city}
            onChange={handleCityChange}
            onClick={handleSearchClick} 
          />
        </div>

        <div className="weather-container">
          {error && <div className="error">{error}</div>}
          {weather && (
            <WeatherCard
              city={cityname}
              temperature={weather.temperature}
              humidity={weather.humidity}
              windSpeed={weather.windSpeed}
              onSearchClick={handleSearchClick}
            />
          )}
        </div>
      </div>
    );
  }

  export default App;
