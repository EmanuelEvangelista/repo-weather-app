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

  // Usar optional chaining para evitar errores
  const iconCode = weatherInfo?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <Card className="mt-4 shadow text-center">
      <Card.Body>
        <Card.Title>
          {name}{sys?.country ? `, ${sys.country}` : ""}
        </Card.Title>

        {iconUrl && (
          <img src={iconUrl} alt={weatherInfo?.[0]?.description || "icon"} />
        )}

        <Card.Text className="text-capitalize">
          {weatherInfo?.[0]?.description || "Sin descripción"}
        </Card.Text>

        <h2>{main?.temp ? `${Math.round(main.temp)}°C` : "N/A"}</h2>

        <Card.Text>
          Sensación térmica: {main?.feels_like ? `${Math.round(main.feels_like)}°C` : "N/A"}
        </Card.Text>

        <Card.Text>
          Humedad: {main?.humidity ? `${main.humidity}%` : "N/A"}
        </Card.Text>

        <Card.Text>
          Viento: {wind?.speed ? `${wind.speed} km/h` : "N/A"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
