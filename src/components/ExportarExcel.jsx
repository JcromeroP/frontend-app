import React, { useState } from 'react';
import { Table, Button, FormControl } from 'react-bootstrap';

const ActividadesAcademicas = () => {
    const [data, setData] = useState([
        {
            actividad: "Preparación de clases",
            dedicacionSemanal: 0,
            dedicacionSemestre: 0,
            descripcion: "Actividad preparar clase",
            producto: "✓ MATERIAL EDUCATIVO, ✓ SYLLABUS DE LA ASIGNATURA..."
        },
        {
            actividad: "Evaluación de aprendizajes a estudiantes",
            dedicacionSemanal: 0,
            dedicacionSemestre: 0,
            descripcion: "Actividad evaluación",
            producto: "✓ EVIDENCIAS DE AUTOEVALUACIÓN, ✓ PLANILLA DE CALIFICACIONES.."
        },
        {
            actividad: "Gestión de eventos académicos",
            dedicacionSemanal: 0,
            dedicacionSemestre: 0,
            descripcion: "Actividad gestión de eventos",
            producto: "✓ FO-GD-84 AGENDA PARA ACTIVIDADES ACADÉMICAS, ✓ FO-GD-83 PLANEACIÓN ACTIVIDADES ACADÉMICAS..."
        }
    ]);

    // Función para manejar cambios en los inputs de la tabla
    const handleInputChange = (index, name, value) => {
        const updatedData = [...data];
        updatedData[index][name] = value;
        setData(updatedData);
    };
    return (
        <div>
            <Button style={{ marginBottom: '20px' }}>Exportar a Excel</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Actividad</th>
                        <th style={{ width: '200px', backgroundColor: '#D3D3D3' }}>Dedicación (Horas Semanales)</th>
                        <th style={{ width: '200px', backgroundColor: '#D3D3D3' }}>Dedicación (Horas Semestre)</th>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Descripción de la Actividad</th>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.actividad}</td>
                            <td>
                                <FormControl
                                    type="number"
                                    value={item.dedicacionSemanal}
                                    onChange={(e) => handleInputChange(index, 'dedicacionSemanal', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </td>
                            <td>
                                <FormControl
                                    type="number"
                                    value={item.dedicacionSemestre}
                                    onChange={(e) => handleInputChange(index, 'dedicacionSemestre', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </td>
                            <td>
                                <FormControl
                                    as="textarea"
                                    value={item.descripcion}
                                    onChange={(e) => handleInputChange(index, 'descripcion', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </td>
                            <td>{item.producto}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Actividad</th>
                        <th style={{ width: '200px', backgroundColor: '#D3D3D3' }}>Dedicación (Horas Semanales)</th>
                        <th style={{ width: '200px', backgroundColor: '#D3D3D3' }}>Dedicación (Horas Semestre)</th>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Descripción de la Actividad</th>
                        <th style={{ width: '300px', backgroundColor: '#D3D3D3' }}>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.actividad}</td>
                            <td>
                                <FormControl
                                    type="number"
                                    value={item.dedicacionSemanal}
                                    onChange={(e) => handleInputChange(index, 'dedicacionSemanal', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </td>
                            <td>
                                <FormControl
                                    type="number"
                                    value={item.dedicacionSemestre}
                                    onChange={(e) => handleInputChange(index, 'dedicacionSemestre', e.target.value)}
                                    style={{ width: '100px' }}
                                />
                            </td>
                            <td>
                                <FormControl
                                    as="textarea"
                                    value={item.descripcion}
                                    onChange={(e) => handleInputChange(index, 'descripcion', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </td>
                            <td>{item.producto}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ActividadesAcademicas;
