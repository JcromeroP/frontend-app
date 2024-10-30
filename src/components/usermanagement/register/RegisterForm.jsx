import React from 'react';
import { Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap';

function RegisterForm({ formData, handleChange, handleSubmit, faculties, programs, errors }) {
    const shouldShowFacultyAndProgram = formData.role === '2' || formData.role === '4';

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Input
                    type="text"
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
                    name="documentNumber"
                    placeholder="Número de documento"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    invalid={!!errors.documentNumber}
                />
                <FormFeedback>{errors.documentNumber}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Input
                    type="text"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    disabled
                />
            </FormGroup>

            <FormGroup>
                <Input
                    type="email"
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
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                >
                    <option disabled value="">Selecciona una facultad</option>
                    {faculties.map((facultad) => (
                        <option key={facultad.facultadId} value={facultad.facultadId}>
                            {facultad.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>

            {shouldShowFacultyAndProgram && (
                <FormGroup>
                    <Input
                        type="select"
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
            )}

            <Button type="submit">Registrar</Button>
        </Form>
    );
}

export default RegisterForm;c