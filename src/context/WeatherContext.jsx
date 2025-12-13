import { createContext, useEffect, useState } from 'react';

const WeatherContext = createContext(undefined);

function WeatherProvider({ children }) {
  const [city, setCity] = useState(() => {
    const saved = localStorage.getItem("cities");

    try {
      const parsed = saved ? JSON.parse(saved) : [];

      // Garantizar que siempre sea array
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si falla el JSON.parse, limpiar y devolver array vacío
      return [];
    }
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [weatherCard, setWeatherCard] = useState(null);
  const claveAPI = "fe98ec24d8c8c3045ec7ffc46da0e538";

    useEffect(() => {
  if (!selectedCity) return;

  async function getWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${claveAPI}&units=metric&lang=es`
      );
      const data = await response.json();
      setWeatherCard(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  getWeather();
}, [selectedCity]);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(city));
  }, [city]);

  return (
    <WeatherContext.Provider value={{ 
      city, 
      selectedCity,
      weatherCard,
      setCity,
      setSelectedCity
      }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };