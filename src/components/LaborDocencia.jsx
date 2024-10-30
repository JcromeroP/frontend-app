import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';



const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];


function LaborDocencia() {


  const [data, setData] = useState(initialDataAsignatura);
  const [form, setForm] = useState({
    asignatura: '',
    programa: '',
    grupo: '',
    sede: '',
    dedicacionHorasSemanales: '',
    dedicacionHorasSemestrales: '',
    totalHorasSemanales: '',
  });

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };


  const ocultarModalInsertar = () => {
    setModalInsertar(false);
  };

  const mostrarModalEditar = (elemento, index) => {
    setForm(elemento);
    setModalEditar(true);
    setSelectedId(index);
  };

  const ocultarModalEditar = () => {
    setModalEditar(false);
  };

  const insertar = () => {
    setData([...data, form]);
    ocultarModalInsertar();
  };

  const editar = () => {
    const updatedData = [...data];
    updatedData[selectedId] = form;
    setData(updatedData);
    ocultarModalEditar();
  };

  

  return (
    <>
      <Container className="d-flex justify-content-between align-items-center">
      <Button color="success" onClick={mostrarModalInsertar}>+ Agregar</Button>
      <div className="d-flex align-items-center">
      <h6 className="mb-0 me-2">Cant. Horas</h6>
      <td className="mb-0">1</td>
      </div>
      </Container>

            <br></br>
            <Container>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre del profesor</th>
                    <th>Facultad</th>
                    <th>Programa</th>
                    <th>Sede</th>
                    <th>Fecha</th>
                    <th>Periodo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((elemento, index) => (
                    <tr key={index}>
                      <td>{elemento.asignatura}</td>
                      <td>{elemento.programa}</td>
                      <td>{elemento.grupo}</td>
                      <td>{elemento.sede}</td>
                      <td>{elemento.dedicacionHorasSemanales}</td>
                      <td>{elemento.dedicacionHorasSemestrales}</td>
                      <td>{elemento.totalHorasSemanales}</td>
                      <td>
                        <Button color='success' onClick={() => mostrarModalEditar(elemento, index)}>Editar</Button>{" "}
                        <Button color='danger'>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Total Horas Semanales</th>
                    <th>Total Horas Semestrales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </Table>
            </Container>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Labor Docencia</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre Asignatura:</label>
            <input className='form-control' name="asignatura" type='text' onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Programa:</label>
            <Input className='form-control' name="programa" type='select' onChange={handleChange}>
              <option value="">Selecciona un programa</option>
              <option value="Ing. Sistemas">Ing. Sistemas</option>
              <option value="Ing. Industrial">Ing. Industrial</option>
              <option value="Ing. Ambiental">Ing. Ambiental</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <label>Grupo:</label>
            <input className='form-control' name='grupo' type='text' onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Sede:</label>
            <Input className='form-control' name="sede" type='select' onChange={handleChange}>
              <option value="">Selecciona una sede</option>
              <option value="Prado Alto">Prado Alto</option>
              <option value="Quirinal">Quirinal</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semanales:</label>
            <input className='form-control' name='dedicacionHorasSemanales' type='text' onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semestrales:</label>
            <input className='form-control' name='dedicacionHorasSemestrales' type='text' onChange={handleChange} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={insertar}>Insertar</Button>
          <Button color='danger' onClick={ocultarModalInsertar}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Labor Docencia</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre Asignatura:</label>
            <input className='form-control' name="asignatura" type='text' value={form.asignatura} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Programa:</label>
            <Input className='form-control' name="programa" type='select' value={form.programa} onChange={handleChange}>
              <option value="">Selecciona un programa</option>
              <option value="Ing. Sistemas">Ing. Sistemas</option>
              <option value="Ing. Industrial">Ing. Industrial</option>
              <option value="Ing. Ambiental">Ing. Ambiental</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <label>Grupo:</label>
            <input className='form-control' name='grupo' type='text' value={form.grupo} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Sede:</label>
            <Input className='form-control' name="sede" type='select' value={form.sede} onChange={handleChange}>
              <option value="">Selecciona una sede</option>
              <option value="Prado Alto">Prado Alto</option>
              <option value="Quirinal">Quirinal</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semanales:</label>
            <input className='form-control' name='dedicacionHorasSemanales' type='text' value={form.dedicacionHorasSemanales} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semestrales:</label>
            <input className='form-control' name='dedicacionHorasSemestrales' type='text' value={form.dedicacionHorasSemestrales} onChange={handleChange} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={editar}>Editar</Button>
          <Button color='danger' onClick={ocultarModalEditar}>Cancelar</Button>
        </ModalFooter>
       
      </Modal>

    </>
  );
}

export default LaborDocencia;
