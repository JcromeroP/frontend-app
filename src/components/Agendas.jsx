import React, { useState } from 'react';
import '../App.css';
import logoCorhuila from '../logoCorhuila.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Input, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Navbar, NavbarBrand } from 'reactstrap';

import { Tabs, Tab } from 'react-bootstrap';


const initialDataAsignatura = [
  { asignatura: 'Distribuidos', programa: 'Ing. Sistemas', grupo: '90B', sede: 'Prado Alto', dedicacionHorasSemanales: '4', dedicacionHorasSemestrales: '12', totalHorasSemanales: '0' }
];


function Agendas() {


  const [activeTab, setActiveTab] = useState('1');

  const handleNext = () => {
    if (activeTab === '1') {
      setActiveTab('2');
    } else if (activeTab === '2') {
      setActiveTab('3');
    } else if (activeTab === '3') {
      setActiveTab('4');
    } else if (activeTab === '4') {
      setActiveTab('5');
    }
  };

  const handleBack = () => {
    if (activeTab === '2') {
      setActiveTab('1');
    } else if (activeTab === '3') {
      setActiveTab('2');
    } else if (activeTab === '4') {
      setActiveTab('3');
    } else if (activeTab === '5') {
      setActiveTab('4');
    }
  };



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
      <Container className="text-success text-center">
        <h1>Registro de Agenda Profesoral</h1>
      </Container>
      <br></br>
      <Container>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="1" title={<span className="text-success">Lab. Docencia</span>}>
            <Container>
              <Button color="success" onClick={mostrarModalInsertar}>+ Agregar</Button>
            </Container>
            <br></br>
            <Container>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre Asignatura</th>
                    <th>Programa</th>
                    <th>Grupo</th>
                    <th>Sede</th>
                    <th>Dedicación Horas Semanales</th>
                    <th>Dedicación Horas Semestrales</th>
                    <th>Total Horas Semanales</th>
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
              <Button color="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="2" title={<span className="text-success">Lab. Académicas y Formativas</span>}>
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
              <Button color="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button color="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="3" title={<span className="text-success">Lab. Científicas</span>}>
            <Container>
              <Button color="success" onClick={mostrarModalInsertar}>+ Agregar</Button>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
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
              <Button color="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button color="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="4" title={<span className="text-success">Lab. de Extensión y Culturales</span>} >
            <Container>
              <Button color="success" onClick={mostrarModalInsertar}>+ Agregar</Button>
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

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
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
              <Button color="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button color="success" onClick={handleNext}>Siguiente</Button>
            </Container>
          </Tab>
          <Tab eventKey="5" title={<span className="text-success">Act. de Gestión Académica y Administrativas</span>}>
            <Container>
              <Button color="success" onClick={mostrarModalInsertar}>+ Agregar</Button>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actividad 1</td>
                  </tr>
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
              <Button color="secondary" onClick={handleBack}>Atrás</Button>{" "}
              <Button color="success" onClick={handleNext}>Enviar</Button>
            </Container>
          </Tab>
        </Tabs>
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

export default Agendas;
