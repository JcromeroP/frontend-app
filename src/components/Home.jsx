import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoCorhuila from '../logoCorhuila.jpg';
import iconUser from '../vectores/person-circle.svg';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import '../index';
import docente from '../vectores/s.svg';
import funciones from '../vectores/funcionalidades.svg';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

function Home() {
    const role = localStorage.getItem('role');
  const showfordocente = role === 'Docente';
  const showfordirector = role === 'Director De programa';
  const showfordecano = role === 'Decano';

  const navbarStyles = {
    zIndex: 1000,
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
    width: '100%',
  };

  const logoStyles = {
    height: '40px',
    width: 'auto',
  };

  const iconUserStyles = {
    height: '30px',
    width: '30px',
  };

  return (
    <>
      <Navbar style={navbarStyles} className="custom-navbar">
        <Navbar.Brand as={Link} to="/Home">
          <img style={logoStyles} alt="logo" className='logo' src={logoCorhuila} />
        </Navbar.Brand>

        {showfordocente && (
          <Nav className="mx-auto">
            <Nav.Link className="text-success fs-5" href="/AgendasDocente">
              Mis Agendas
            </Nav.Link>
            <Nav.Link className="text-success fs-5" href="/formulario">
              Formulario
            </Nav.Link>
          </Nav>
        )}

        {showfordecano && (
          <Nav className="mx-auto">
            <Nav.Link className="text-success fs-5" href="/Decano/Autorizacion_Decano">
              Pendientes
            </Nav.Link>
            <Nav.Link className="text-success fs-5" href="/Decano/HistoricoDecano">
              Historico
            </Nav.Link>
          </Nav>
        )}

        {showfordirector && (
          <Nav className="mx-auto">
            <Nav.Link className="text-success fs-5" href="/DirectorPrograma">
              Pendientes
            </Nav.Link>
            <Nav.Link className="text-success fs-5" href="/Director/HistoricoDirector">
              Historico
            </Nav.Link>
          </Nav>
        )}

        <NavDropdown
          align="end"
          title={<img style={iconUserStyles} className="icon-user text-success" src={iconUser} alt="User Icon" />}
          id="basic-nav-dropdown"
          flip
        >
        <br />
        <br />
          <NavDropdown.Item href="/">Cerrar Sesión</NavDropdown.Item>
        </NavDropdown>
      </Navbar>

      <Container style={{ width: '100%', maxWidth: '1000px', height: 'auto' }}>

        </Container>
    <Container className="text-center mt-4">
        <Row>
            
          <Col>
            <h2>Sistema de agendamiento semestral profesoral</h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Container>
              <CardBody>
                <h4>Bienvenido a tu entorno de agendamiento</h4>
                <p>
                  ¡Bienvenidos al Sistema de Agenda Semestral Profesoral! Este innovador recurso ha sido diseñado para
                  facilitar la organización y planificación de las actividades académicas de nuestros docentes.
                </p>
              </CardBody>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="container mt-4 home-docente-content">
            <h3>Bienvenido a la Agenda Docente</h3>
            <div className="content-wrapper">
                {/* Primera sección */}
                <div className="container overflow-container">
                    <section className="text-content">

                        <div className="d-sm-flex align-items-center justify-content-between"><div className="col-sm">
                                <div className="image-content">
                                    <img src={docente} alt="Vector agenda" className="docente-vector" />
                                </div>
                            </div>
                            <div className="col-md p-3">
                              <h2>Agenda Semestral Profesoral</h2>
                              <br />
                                <p>
                                    La <strong>Agenda Semestral Profesoral</strong> es una herramienta creada para simplificar la gestión de las actividades educativas de manera eficiente y automatizada. Este sistema permite 
                                    a los profesores registrar y administrar sus horas en función de sus responsabilidades académicas, así como de actividades científicas, culturales y administrativas, garantizando que cumplan con sus compromisos institucionales según las directrices de la institución.
                                </p>
                                <p>
                                    Además de mejorar la organización personal de los docentes, esta herramienta facilita a las instituciones educativas un control más efectivo sobre las tareas asignadas a cada profesor. 
                                    Desde el registro de asignaturas hasta la generación de informes completos, la Agenda Docente está diseñada para optimizar tanto el trabajo administrativo como el académico.
                                </p>
                            </div>
                            
                        </div>
                    </section>

                    {/* Segunda sección */}
                    <section className="text-content">
                        <div className="d-sm-flex align-items-center justify-content-between">
                            
                            <div className="col-md p-3">
                                <h3>Funcionalidades del Sistema</h3>
                                <p>
                                    La <strong>Agenda Semestral Profesoral</strong> ofrece a los profesores una variedad de funciones:
                                </p>
                                <ul>
                                    <li>Registrar asignaturas y horarios de clases.</li>
                                    <li>Administrar y gestionar las horas dedicadas a actividades académicas, científicas y culturales.</li>
                                    <li>Generar informes sobre las actividades realizadas y el tiempo invertido.</li>
                                    <li>Supervisar el cumplimiento de compromisos académicos e institucionales.</li>
                                    <li>Facilitar la comunicación con la administración mediante reportes y solicitudes.</li>
                                </ul>
                                <p>
                                Además, el sistema está diseñado para ser intuitivo y fácil de utilizar, lo que permite a los docentes enfocarse en sus actividades académicas sin preocuparse por la gestión administrativa.
                                </p>
                            </div>
                            <div className="col-sm">
                                <div className="image-content">
                                    <img src={funciones} alt="Vector agenda" className="docente-vector-lista" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>
  );
        
}
export default Home;
