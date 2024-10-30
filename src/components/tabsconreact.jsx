import React, { useState } from 'react';
import { Container,Tab, Tabs, Button, Form } from 'react-bootstrap';

function UncontrolledExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [activeTab, setActiveTab] = useState('home');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (activeTab === 'home') {
      setActiveTab('profile');
    } else if (activeTab === 'profile') {
      setActiveTab('contact');
    }
  };

  const handleBack = () => {
    if (activeTab === 'profile') {
      setActiveTab('home');
    } else if (activeTab === 'contact') {
      setActiveTab('profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Datos enviados correctamente');
      } else {
        alert('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión al servidor');
    }
  };

  return (
    <>
    <Container>
        <Form onSubmit={handleSubmit}>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ingrese su nombre" />
          </Form.Group>
          <Button onClick={handleNext}>Siguiente</Button>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <Form.Group>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ingrese su correo electrónico" />
          </Form.Group>
          <Button onClick={handleBack}>Atrás</Button>
          <Button onClick={handleNext}>Siguiente</Button>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <Form.Group>
            <Form.Label>Edad</Form.Label>
            <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Ingrese su edad" />
          </Form.Group>
          <Button onClick={handleBack}>Atrás</Button>
          <Button type="submit">Enviar</Button>
        </Tab>
      </Tabs>
    </Form>
    </Container>
    </>
  );
}

export default UncontrolledExample;