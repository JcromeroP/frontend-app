import "../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormControl, Container, Table, Tabs, Tab, Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from "react-bootstrap";
import { Input } from "reactstrap";

const AgendasProfesores = () => {

    const [dataAgena, setDataAgenda] = useState([
        {
          profesor: "JESÚS ARIEL GONZALES",
          facultad:'Facultad Ingeniería',
          programa: 'Ing. de Energías Renovables',
          fecha: '12-09-2024',
          periodo: '2024B',
          aprobadoDirPrograma: 'En Revisión',
          aprobadoDecano: 'En Revisión',
          aprobadoVecerrectoria: 'En espera de aprobación'
        },
        {
          profesor: "JESÚS ARIEL GONZALES",
          facultad:'Facultad Ingeniería',
          programa: 'Ing. de Energías Renovables',
          fecha: '12-09-2024',
          periodo: '2024B',
          aprobadoDirPrograma: 'En Revisión',
          aprobadoDecano: 'En Revisión',
          aprobadoVecerrectoria: 'En espera de aprobación'
        },
      ]);

      // Función para manejar la aprobación
      const aprobarAgenda = (index) => {
        const updatedAgenda = [...dataAgena];
        updatedAgenda[index].aprobadoDirPrograma = 'Aprobado';
        setDataAgenda(updatedAgenda);
      };
    
      // Función para manejar la desaprobación
      const desaprobarAgenda = (index) => {
        const updatedAgenda = [...dataAgena];
        updatedAgenda[index].aprobadoDirPrograma = 'Desaprobado';
        setDataAgenda(updatedAgenda);
      };
return(
    <>
            <br></br>
            <Container className="text-success text-start">
                <h2>Agendas Profesorales</h2>
            </Container>

            <Container>
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Nombre del Profesor
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Facultad
                    </th>
                    <th
                      style={{
                        width: "300px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Programa
                    </th>
                    <th
                      style={{
                        width: "130px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Fecha
                    </th>
                    <th
                      style={{
                        width: "70px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Periodo
                    </th>
                    <th
                      style={{
                        width: "200px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Estado Dir. Programa
                    </th>
                    <th
                      style={{
                        width: "160px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Estado Decano
                    </th>
                    <th
                      style={{
                        width: "160px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Estado Vicerrectoria
                    </th>
                    <th
                      style={{
                        width: "160px",
                        backgroundColor: "#4CAF50",
                        color: "#FFFFFF",
                      }}
                    >
                      Acciones
                    </th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {dataAgena.map((item, index) => (
                    <tr key={index}>
                      <td>{item.profesor}</td>
                      <td>{item.facultad}</td>
                      <td>{item.programa}</td>
                      <td>{item.fecha}</td>
                      <td>{item.periodo}</td>
                      <td>{item.aprobadoDirPrograma}</td>
                      <td>{item.aprobadoDecano}</td>
                      <td>{item.aprobadoVecerrectoria}</td>
                      <td>
                        <Button variant='secondary'>Descargar</Button>{" "}
                        <Button variant='success' onClick={() => aprobarAgenda(index)}>Aprobar</Button>{" "}
                        <Button variant='danger' onClick={() => desaprobarAgenda(index)}>Desaprobar</Button>
                      </td>  
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            </Container>

</>
);
};
export default AgendasProfesores;