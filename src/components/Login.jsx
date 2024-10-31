import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './Registro'
import logoCorhuila from '../logoCorhuila.jpg';
import fondo from '../Fondo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode'; 
import { Button, Form, FormGroup, Container, Card, CardBody, FormFeedback, Input } from 'reactstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { username: '', password: '' };

    // Validación del nombre de usuario
    if (!username) {
      formIsValid = false;
      newErrors.username = 'El nombre de usuario es requerido.';
    }

    // Validación de la contraseña
    if (!password) {
      formIsValid = false;
      newErrors.password = 'La contraseña es requerida.';
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const loginData = {
          username: username,
          password: password,
        };
/* http://ec2-18-189-202-101.us-east-2.compute.amazonaws.com:8081*/
        const response = await axios.post('http://localhost:8080/api/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { status, message, data } = response.data;
        
        if (response.data.status === 200 || response.data.status === 201) {
         
          decodeToken(response.data.data)
      }
      if(response.data.status === 400 || response.data.status === 403 ||response.data.status === 401 || response.data.status === 404  ){
          Swal.fire({
              icon: 'error',
              title: 'Error En el inicio de sesion',
              text: message || 'Por favor inténtalo nuevamente.',
              confirmButtonText: 'Aceptar'
          })
      }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: error.response?.data?.message || 'Ocurrió un error al intentar iniciar sesión.',
          confirmButtonText: 'Aceptar'
        });
      }
    
  };

  const decodeToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    localStorage.setItem('idUser',decodedToken.idUser);
    localStorage.setItem('name',decodedToken.name);
    localStorage.setItem('facultad',decodedToken.facultad);
    localStorage.setItem('programa',decodedToken.programa);
    localStorage.setItem('email',decodedToken.email);
    localStorage.setItem('role',decodedToken.role);

   if(userRole === 'Docente'){
    navigate("/AgendasDocente"); 
   }
   if(userRole === 'Admin'){
    navigate("/Administracion");
   }
   if(userRole === 'Decano'){
    navigate("/Decano/Autorizacion_Decano");
   }
   if(userRole === 'Director De programa'){
    navigate("/DirectorPrograma");
   }
  };


  return (
    <div className="login-page" style={styles.page}>
      <Container style={styles.container}>
        <Card style={styles.card}>
          <CardBody>
            <div style={styles.logoContainer}>
              <img className='logo-login' src={logoCorhuila} alt="CORHUILA Logo" />
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <FormGroup>
                <Input 
                  type="email" 
                  className="form-control mt-3" 
                  id="username" 
                  placeholder="Correo electrónico" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  invalid={!!errors.username}
                />
                <FormFeedback>{errors.username}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input 
                  type="password" 
                  className="form-control mt-3" 
                  id="inputPassword" 
                  placeholder="Contraseña" 
                  value={password} 
                />
                <FormFeedback>{errors.password}</FormFeedback>
              </FormGroup>
              <Button  type="submit" color="success">
                Acceder
              </Button>
              <div className="mt-3">
                <a href="/forgot-password" style={{...styles.link, display: 'block'}  }>
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};



const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    width: '380px',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  link: {
    color: '#28a745',
    textDecoration: 'none',
  },
};

export default Login;