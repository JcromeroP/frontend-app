import React, { useState } from 'react';
import '../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';



function LaboresAcademicasForm() {


  const [modalInsertarActividad, setModalInsertarActividad] = useState(false);
  const [modalEditarActividad, setModalEditarActividad] = useState(false);
  const [formActividad, setFormActividad] = useState({
    actividad: '',
    horasSemanalesActv: '',
    horasSemestralesActv: '',
    descripcion: '',
    producto: [],
  });

  const [selectedActividadIndex, setSelectedActividadIndex] = useState(null);
  const [actividades, setActividades] = useState([]);


  const abrirModalInsertarActividad = () => {
    setModalInsertarActividad(true);
  };

  const abrirModalEditarActividad = (actividad, index) => {
    setFormActividad(actividad);
    setSelectedActividadIndex(index);
    setModalEditarActividad(true);
  };


  const ocultarModalActividad = () => {
    setModalInsertarActividad(false);
    setModalEditarActividad(false);
  };

  const insertarActividad = () => {
    const nuevaActividad = { ...formActividad };

    setActividades([...actividades, nuevaActividad]);
    setModalInsertarActividad(false);

    setFormActividad({
      actividad: '',
      horasSemanalesActv: '',
      horasSemestralesActv: '',
      descripcion: '',
      producto: [],
    });
  };

  const editarActividad = () => {
    const actividadesActualizadas = [...actividades];
    actividadesActualizadas[selectedActividadIndex] = formActividad; // Actualiza la actividad con los nuevos datos

    setActividades(actividadesActualizadas); // Actualizar la lista de actividades
    setModalEditarActividad(false); // Cerrar el modal después de editar
  };


  const handleActividadChange = (e) => {
    setFormActividad({
      ...formActividad,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductoChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {

      setFormActividad({
        ...formActividad,
        producto: [...formActividad.producto, value],
      });
    } else {

      setFormActividad({
        ...formActividad,
        producto: formActividad.producto.filter((prod) => prod !== value),
      });
    }
  };

  const productosDisponibles = [
    "Producto 1",
    "Producto 2",
    "Producto 3",
    "Producto 4",
    "Producto 5",
    "Producto 6",
    "Producto 7",
    "Producto 8",
    "Producto 9",
    "Producto 10",
  ];


  return (
    <>
      <br></br>
          
            <Container>
              <Button color="success" onClick={abrirModalInsertarActividad}>+ Agregar</Button>
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {actividades.map((actividad, index) => (
                    <tr key={index}>
                      <td>{actividad.actividad}</td>
                      <td>{actividad.horasSemanalesActv}</td>
                      <td>{actividad.horasSemestralesActv}</td>
                      <td>{actividad.descripcion}</td>
                      <td>{actividad.producto.join(', ')}</td>
                      <td>
                        <Button color="success" onClick={() => abrirModalEditarActividad(actividad, index)}>Editar</Button>
                        <Button color="danger">Eliminar</Button>
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

      <Modal isOpen={modalInsertarActividad}>
        <ModalHeader>
          <div>
            <h3>Insertar Actividad</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre Actividad:</label>
            <input className='form-control' name="actividad" type='text' value={formActividad.actividad} onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semanales:</label>
            <input className='form-control' name="horasSemanalesActv" value={formActividad.horasSemanalesActv} type='text' onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semestrales:</label>
            <input className='form-control' name="horasSemestralesActv" value={formActividad.horasSemestralesActv} type='text' onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Descripción de la Actividad:</label>
            <textarea className='form-control' name="descripcion" value={formActividad.descripcion} onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Producto:</label>
            {productosDisponibles.map((producto, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="producto"
                  value={producto}
                  onChange={handleProductoChange}
                  checked={formActividad.producto.includes(producto)}
                />
                {producto}
              </div>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={insertarActividad}>Insertar</Button>
          <Button color='danger' onClick={ocultarModalActividad}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditarActividad}>
        <ModalHeader>
          <div>
            <h3>Editar Actividad</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre Actividad:</label>
            <input className='form-control' name="actividad" type='text' onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semanales:</label>
            <input className='form-control' name="horasSemanalesActv" type='text' onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Dedicación Horas Semestrales:</label>
            <input className='form-control' name="horasSemestralesActv" type='text' onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Descripción de la Actividad:</label>
            <textarea className='form-control' name="descripcion" onChange={handleActividadChange} />
          </FormGroup>

          <FormGroup>
            <label>Producto:</label>
            {productosDisponibles.map((producto, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="producto"
                  value={producto}
                  onChange={handleProductoChange}
                  checked={formActividad.producto.includes(producto)}
                />
                {producto}
              </div>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={editarActividad}>Editar</Button>
          <Button color='danger' onClick={ocultarModalActividad}>Cancelar</Button>
        </ModalFooter>
      </Modal>



    </>
  );
}

export default LaboresAcademicasForm;
