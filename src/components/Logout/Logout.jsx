import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext.jsx";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAlertContext} from '../../context/alertContext.jsx';

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated, setIsSubmitted } = useContext(WeatherContext);
  const { onOpen } = useAlertContext();

  const handleLogout = () => {
    // 👉 limpiar estados del contexto
    setUser({ firstName: "", lastName: "", email: "" });
    setIsAuthenticated(false);
    setIsSubmitted(false);
    onOpen('success', 'Your seccion has been closed');

    // 👉 limpiar localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("isAuthenticated");
    // 👉 redirigir al home
    navigate("/login");
  };

  return (
    <Button
      variant="outline-warning"
      style={{
        backgroundColor: "black",
        border: "none",
        color: "#f4ce14",
        fontWeight: "bold",
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
