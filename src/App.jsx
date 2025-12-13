import AppRoutes from './routes/AppRoutes.jsx';
import './App.css';
import { AlertProvider } from './context/alertContext.jsx';
import { WeatherProvider } from './context/weatherContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
 

  return (
    <>
    <ChakraProvider>
    <WeatherProvider>
    <AlertProvider>
      <AppRoutes />
    </AlertProvider>
    </WeatherProvider>
    </ChakraProvider>
    </>
  )
}

export default App
