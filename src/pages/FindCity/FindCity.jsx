import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { WeatherContext } from '../../context/WeatherContext.jsx';
import {useAlertContext} from "../../context/alertContext.jsx";

const FindCity = () => {
  const { city, setCity, setUserStored, user } = useContext(WeatherContext);
  const [cityToAdd, setCityToAdd] = useState("");
  const { onOpen } = useAlertContext();

  function handleAddCity() {
    if (cityToAdd.trim() === "") return;
    if (city.includes(cityToAdd)) {
       onOpen('error', 'This city has already been added');
      return;
    }
    setCity((prevCity) => [...prevCity, cityToAdd]);
    onOpen('success', `Thank you, your city: ${cityToAdd} has been successfully added`);
    setCityToAdd("");
  }

  function handleClearCities() {
  sessionStorage.removeItem("cities");   // limpia solo cities
  setCity([]);                          // resetea el estado
  onOpen('success', 'Cities list has been cleared');
}
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Add City</Card.Title>

              <Form className="mt-3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={cityToAdd}
                    onChange={(e) => setCityToAdd(e.target.value)}
                    placeholder="Enter city here"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3 w-100"
                  onClick={handleAddCity}
                >
                  {console.log(city)}
                  Add
                </Button>
                <Button
                  variant="outline-danger"
                  className="mt-2 w-100"
                  onClick={handleClearCities}
                  disabled={city.length === 0}
                >
                  Clear cities
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FindCity;