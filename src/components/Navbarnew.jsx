import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoCorhuila from '../logoCorhuila.jpg';
import iconUser from '../vectores/person-circle.svg';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

function Navbarnew() {
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
      <Navbar style={navbarStyles} className="fixed-top">
        <Navbar.Brand as={Link} to="/Home">
          <img style={logoStyles} alt="logo" src={logoCorhuila} />
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
          <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/">Cerrar Sesión</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </>
  );
}

export default Navbarnew;
