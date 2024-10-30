import React, { useState, useEffect } from 'react';
import { Button, Container, Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import RegisterForm from './registerform';
import { validateForm } from './validation';
import fondo from '../Fondo.png';
import './register.css';

function Registro() {
    const [formData, setFormData] = useState({
        firstName: '',
        firstLastName: '',
        documentNumber: '',
        password: '',
        email: '',
        role: '',
        faculty: '',
        program: ''
    });

    const [faculties, setFaculties] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Fetch faculties and programs...
    // ... Your fetchFaculties and fetchProgramsByFaculty functions here

    useEffect(() => {
        fetchFaculties();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'documentNumber') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                password: value
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(formData, setErrors)) {
            // Submit logic...
            // Your submit logic here, including axios.post
        }
    };

    return (
        <div className="registro-page" style={{ backgroundImage: `url(${fondo})` }}>
            <Container>
                <Card>
                    <CardBody>
                        <h2>Administración Registros de Usuarios</h2>
                        <p>Importante: Debes ingresar los datos exactamente como se muestran en el documento reportado.</p>
                        <RegisterForm 
                            formData={formData} 
                            handleChange={handleChange} 
                            handleSubmit={handleSubmit} 
                            faculties={faculties} 
                            programs={programs} 
                            errors={errors} 
                        />
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default Registro;