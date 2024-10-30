import '../App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoCorhuila from '../logoCorhuila.jpg';
import Login from './Login';
import Home from './Home';
import iconUser from '../vectores/person-circle.svg';

import { Container, Table, Input, Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink, Nav, Tabs, Tab } from 'react-bootstrap';

function AgendaForm() {

  const [activeTab, setActiveTab] = useState('1');

  const handleNext = () => {
    if (activeTab === '1') {
      setActiveTab('2');
    } else if (activeTab === '2') {
      setActiveTab('3');
    } else if (activeTab === '3') {
      setActiveTab('4');
    } else if (activeTab === '4') {
      setActiveTab('5');
    }
  };

  const handleBack = () => {
    if (activeTab === '2') {
      setActiveTab('1');
    } else if (activeTab === '3') {
      setActiveTab('2');
    } else if (activeTab === '4') {
      setActiveTab('3');
    } else if (activeTab === '5') {
      setActiveTab('4');
    }
  };

    


  return (
    <>
    <br></br>
      <Container className="text-success text-center">
        <h1>Registro de Agenda Profesoral</h1>
      </Container>
      <br></br>
      <Container>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="1" title={<span className="text-success">Lab. Docencia</span>}>
            <Container>
              <Button variant="success">+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre Asignatura</th>
                    <th>Programa</th>
                    <th>Grupo</th>
                    <th>Sede</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Asignatura 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="2" title={<span className="text-success">Lab. Académicas y Formativas</span>}>
            <Container>
              <Button variant="success">+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción de la actividad</th>
                    <th>Producto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button variant="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="3" title={<span className="text-success">Lab. Científicas</span>}>
            <Container>
              <Button variant="success">+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción de la actividad</th>
                    <th>Producto</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button variant="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="4" title={<span className="text-success">Lab. de Extensión y Culturales</span>} >
            <Container>
              <Button variant="success">+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción de la actividad</th>
                    <th>Producto</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button variant="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="5" title={<span className="text-success">Act. de Gestión Académica y Administrativas</span>}>
            <Container>
              <Button variant="success">+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Descripción de la actividad</th>
                    <th>Producto</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button variant="success" onClick={handleNext}>Enviar</Button>
            </Container>
          </Tab>
        </Tabs>
      </Container>
      </>
  );
}
export default AgendaForm;