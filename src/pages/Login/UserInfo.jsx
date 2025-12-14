import { useContext, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { Button, Card, Container } from "react-bootstrap";
import Logout  from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";

const UserInfoShow = () => {
  const { user, isAuthenticated } = useContext(WeatherContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; // o un loader
  }
  return (
    <Container
      style={{
        marginTop: "2rem",
        lineHeight: "2rem",
        fontSize: "1.1rem",
        backgroundColor: "#3a4a45",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
      }}
    >
      <Card.Title
        style={{
          color: "#f4ce14",
          fontFamily: "Roboto Condensed, sans-serif",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        User Information
      </Card.Title>

      {user.firstName && (
        <Card.Text style={{ marginBottom: "0.75rem", color: "white" }}>
          <strong style={{ color: "#f4ce14" }}>First Name:</strong> {user.firstName}
        </Card.Text>
      )}
      {user.lastName && (
        <Card.Text style={{ marginBottom: "0.75rem", color: "white" }}>
          <strong style={{ color: "#f4ce14" }}>Last Name:</strong> {user.lastName}
        </Card.Text>
      )}
      {user.email && (
        <Card.Text style={{ marginBottom: "0.75rem", color: "white" }}>
          <strong style={{ color: "#f4ce14" }}>Email:</strong> {user.email}
        </Card.Text>
      )}

      <Card.Body className="d-flex justify-content-end">
        <Logout />
      </Card.Body>
    </Container>
  );
};

export default UserInfoShow;
