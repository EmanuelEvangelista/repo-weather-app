import { Card } from 'react-bootstrap';
import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext.jsx';

const WeatherCard = () => {
    const { weatherCard } = useContext(WeatherContext);

  if (!weatherCard) return null;

  const {
    name,
    sys,
    main,
    weather: weatherInfo,
    wind
  } = weatherCard;

  const iconCode = weatherInfo[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Card className="mt-4 shadow text-center">
      <Card.Body>
        <Card.Title>
          {name}, {sys.country}
        </Card.Title>

        <img src={iconUrl} alt={weatherInfo[0].description} />

        <Card.Text className="text-capitalize">
          {weatherInfo[0].description}
        </Card.Text>

        <h2>{Math.round(main.temp)}°C</h2>

        <Card.Text>
          Sensación térmica: {Math.round(main.feels_like)}°C
        </Card.Text>

        <Card.Text>
          Humedad: {main.humidity}%
        </Card.Text>

        <Card.Text>
          Viento: {wind.speed} km/h
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;