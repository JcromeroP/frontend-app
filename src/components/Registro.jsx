import React, { useState, useEffect } from 'react'; 
import fondo from '../Fondo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Button, Form, FormGroup, Container, Card, CardBody, FormFeedback, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Registro() {
    const [formData, setFormData] = useState({
        firstName: '',
        firstLastName: '',
        documentNumber: '',
        password: '', // Se establecerá automáticamente
        email: '',
        role: '',
        faculty: '',
        program: ''
    });

    const [faculties, setFaculties] = useState([]); 
    const [programs, setPrograms] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const fetchFaculties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/program/faculties'); 
            const data = response.data;
            setFaculties(data.data);
        } catch (error) {
            console.error("Error al obtener las facultades:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al cargar las facultades.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const fetchProgramsByFaculty = async (facultadId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/Program/Programs?facultadId=${facultadId}`);
            const data = response.data;
            setPrograms(data.data); 
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    useEffect(() => {
        fetchFaculties(); 
    }, []);

    const shouldShowFacultyAndProgram = formData.role === '2' || formData.role === '4';

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                ...(value !== '2' && value !== '4' ? { faculty: '', program: '' } : {})
            }));
            setPrograms([]);
        } else if (name === 'documentNumber') {
            // Establece la contraseña como el número de documento
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                password: value // La contraseña será el número de documento
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleChangeFacul = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'faculty') {
            fetchProgramsByFaculty(value); 
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.firstName) {
            formErrors.firstName = "El nombre es requerido.";
            valid = false;
        }
        if (!formData.firstLastName) {
            formErrors.firstLastName = "El apellido es requerido.";
            valid = false;
        }
        if (!formData.documentNumber) {
            formErrors.documentNumber = "El número de documento es requerido.";
            valid = false;
        }
        if (!formData.password) {
            formErrors.password = "La contraseña es requerida.";
            valid = false;
        }
        if (!formData.email) {
            formErrors.email = "El correo electrónico es requerido.";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const user = {
                nombre: formData.firstName,
                apellido: formData.firstLastName,
                identificacion: formData.documentNumber,
                email: formData.email,
                password: formData.password,
                rol: formData.role,
                facultad: formData.faculty,
                programa: formData.program
            };
            
            try {
                const response = await axios.post('http://localhost:8080/api/user/register', user, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            
                const { status, message } = response.data; 

                if (status === 200 || status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: message || 'El usuario ha sido registrado correctamente.',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        navigate("/"); 
                    });
                }
                if (status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: message || 'No se pudo registrar el usuario, por favor inténtalo nuevamente.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: error.response?.data?.message || 'No se pudo registrar el usuario, por favor inténtalo nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
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
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        errorText: {
            color: 'red',
            fontSize: '12px',
        },
    };

    return (
        <div className="registro-page" style={styles.page}>
            <Container style={styles.container}>
                <Card style={styles.card}>
                    <CardBody>
                        <h2 style={styles.title}>Administración Registros de Usuarios</h2>
                        <p>Importante: Debes ingresar los datos exactamente como se muestran en el documento reportado.</p>
                        <Form onSubmit={handleSubmit} style={styles.form}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="firstName"
                                    placeholder="Nombre"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    invalid={!!errors.firstName}
                                />
                                <FormFeedback>{errors.firstName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="firstLastName"
                                    placeholder="Apellido"
                                    value={formData.firstLastName}
                                    onChange={handleChange}
                                    invalid={!!errors.firstLastName}
                                />
                                <FormFeedback>{errors.firstLastName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="documentNumber"
                                    placeholder="Número de documento"
                                    value={formData.documentNumber}
                                    onChange={handleChange}
                                    invalid={!!errors.documentNumber}
                                />
                                <FormFeedback>{errors.documentNumber}</FormFeedback>
                            </FormGroup>

                            {/* Campo de contraseña deshabilitado y con valor automático */}
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="email"
                                    className="form-control mt-3"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    invalid={!!errors.email}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="select"
                                    className="form-control mt-3"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">Selecciona un rol</option>
                                    <option value="2">Director de programa</option>
                                    <option value="3">Decano</option>
                                    <option value="4">Docente</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                        <Input
                                            type="select"
                                            className="form-control mt-3"
                                            name="faculty"
                                            value={formData.faculty}
                                            onChange={handleChangeFacul}
                                        >
                                            <option disabled value="">Selecciona una facultad</option>
                                            {faculties.map((facultad) => (
                                                <option key={facultad.facultyId} value={facultad.facultyId}>
                                                    {facultad.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>


                            {shouldShowFacultyAndProgram && (
                                <>
                                   
                                    <FormGroup>
                                        <Input
                                            type="select"
                                            className="form-control mt-3"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                        >
                                            <option disabled value="">Selecciona un programa</option>
                                            {programs.map((program) => (
                                                <option key={program.id} value={program.id}>
                                                    {program.nombre}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </>
                            )}

                            <Button type="submit" style={styles.button}>Registrar</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default Registro;
