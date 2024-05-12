// WeatherCard.tsx

import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiCloud, WiRain } from 'react-icons/wi';
import './css/WeatherCard.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faWind, faClock } from '@fortawesome/free-solid-svg-icons';

interface WeatherCardProps {
  city: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  onSearchClick: () => void;
}



const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  humidity,
  windSpeed,
  onSearchClick
}: WeatherCardProps) => {
  const renderWeatherIcon = (temperature: number): JSX.Element => {
    if (temperature > 25) {
      return <WiDaySunny data-testid="sunny-icon" />;
    } else if (temperature < 10) {
      return <WiRain className="rainy" />;
    } else {
      return <WiCloud />;
    }
  };
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    return `${hours}:${minutes}`;
  };
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      // Fetch description from API when card is expanded
      fetchDescription(city);
      getCurrentTime();
    }
  };

  const fetchDescription = async (cityName: string) => {
    try {
      const response = await fetch(`http://localhost:4000/weather?city=${cityName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch city description');
      }
      const data = await response.json();
      setDescription(data.description);
      setForecast(data.forecast); 
    } catch (error) {
      console.error('Error fetching city description:', error);
    }
  };
 
 
  const getBackgroundImage = (temperature: number): string => {
    
    if (temperature > 25 && temperature < 35) {
      return 'hot';
    } else if (temperature <= 15 && temperature>0) {
      return 'cold';
    } else if (temperature >= 35) {
      return 'extreme-hot'; // Adjusted to use the extreme-hot class for temperatures above or equal to 35
    } else {
      return 'snowAnimation';
    }
  
  };

  return (
    <div
      className={`weather-card ${expanded ? 'expanded' : ''} ${getBackgroundImage(parseInt(temperature))}`}
      onClick={handleCardClick}
      data-testid="background-image"
    >
       <div className="current-time">
      <div className="clock-icon" />
      {currentTime}
    </div>
      <div className="city">{city}</div>
  
      <div className="current-temperature">{temperature}</div>
  
      <div className="weather-info-container">
  <div className="weather-info">
    <div className="temperature"><FontAwesomeIcon icon={faTint} className="humidity-icon" /> {humidity}</div>
    <div className="temperature"><FontAwesomeIcon icon={faWind} className="wind-speed-icon" /> {windSpeed}</div>
  </div>
  <div className="weather-icon">{renderWeatherIcon(parseInt(temperature))}</div>
  
</div>
      {expanded && forecast && (
        <div className="forecast">
          <div className="description">{description}</div>
          <div className="forecast-container">
            {Object.keys(forecast).map((day, index) => (
              <div key={index} className="forecast-item">
                <div className="day">{day}</div>
                <div className="weather-icon-forecast">{renderWeatherIcon(parseInt(forecast[day]))}</div>
                <div className="temperature">{forecast[day]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default WeatherCard;