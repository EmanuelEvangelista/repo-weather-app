import { createContext, useEffect, useState } from 'react';

const WeatherContext = createContext(undefined);

const userInfo = [
  {email: 'ema@gmail.com',key: 1, cities: ['Rosario', 'Cordoba', 'Santa Fe']},
  {email: 'fati@gmail.com', key: 2, cities: ['Villa del dique', 'Republica dominicana']}
];

function WeatherProvider({ children }) {

  const [city, setCity] = useState(() => {
  const saved = localStorage.getItem("cities");
  return saved ? JSON.parse(saved) : [];
});

  const [selectedCity, setSelectedCity] = useState("");
  const [weatherCard, setWeatherCard] = useState(null);
  const claveAPI = "fe98ec24d8c8c3045ec7ffc46da0e538";

  const storedAuth =
    JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth);

  const [userStored, setUserStored] = useState(userInfo);

  const [isSubmitted, setIsSubmitted] = useState(false);

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser
      ? JSON.parse(storedUser)
      : { firstName: "", lastName: "", email: "" };
  });

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
  localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
}, [isAuthenticated]);

useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(city));
    }, [city]);

useEffect(() => {
  // Guardar siempre el user en localStorage
  localStorage.setItem("userData", JSON.stringify(user));

  // Si el user tiene email, buscar coincidencia en userStored
  if (user?.email) {
    const foundUser = userInfo.find(u => u.email === user.email);
    if (foundUser) {
      setCity(foundUser.cities); // setea las ciudades del usuario encontrado
    }
  }
}, [user, userStored, setCity]);

  return (
    <WeatherContext.Provider value={{ 
      city, 
      selectedCity,
      weatherCard,
      user,
      isAuthenticated,
      isSubmitted,
      userStored,
      setUserStored,
      setIsSubmitted,
      setUser,
      setIsAuthenticated,
      setCity,
      setSelectedCity
      }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };