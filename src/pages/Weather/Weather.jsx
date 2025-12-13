import { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { WeatherContext } from '../../context/WeatherContext.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import WeatherCard  from '../../components/WeatherCard/WeatherCard.jsx';

const Weather = () => {
  const { city, setSelectedCity } = useContext(WeatherContext);
  const [showCard, setShowCard] = useState(false);

  const formik = useFormik({
    initialValues: {
      selectedCity: ''
    },
    validationSchema: Yup.object({
      selectedCity: Yup.string().required('Please select a city')
    }),
    onSubmit: (values) => {
      setSelectedCity(values.selectedCity);
    }
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4">Select City</Card.Title>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>Saved cities</Form.Label>
                  <Form.Select
                    aria-label="Select city"
                    name="selectedCity"
                    onChange={formik.handleChange}
                    value={formik.values.selectedCity}
                  >
                    <option value="">Select a city</option>
                    {city.length > 0 &&
                      city.map((cityName, index) => (
                        <option key={index} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Button 
                type="submit" 
                className="mt-3 w-100"
                onClick={() => setShowCard(true)}
                >
                  Get forecast
                </Button>
              </Form>
            </Card.Body>
            <Card.Body>{showCard ? <WeatherCard /> : null}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Weather;