import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Input, Button, Modal } from 'reactstrap';

function Formulario() {
    const [formData, setFormData] = useState({
        actividad: '',
        dedicacionHorasSemanales: 0,
        dedicacionHorasSemestre: 0,
        descripcion: '',
        producto: []
    });

    // Estado para controlar el modal de mensaje
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [downloadError, setDownloadError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData((prevState) => ({
                ...prevState,
                producto: [...prevState.producto, value]
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                producto: prevState.producto.filter((item) => item !== value)
            }));
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Enviando datos:', formData); // <-- Verifica los datos antes de enviar
      try {
          const response = await axios.post('http://localhost:8080/api/saveData', formData);
          setModalMessage('Datos enviados exitosamente.');
          setShowModal(true); // Mostrar el modal
      } catch (error) {
          setModalMessage('Error al enviar datos.');
          setShowModal(true); // Mostrar el modal
          console.error('Error al enviar datos:', error);
      }
  };
  
  

    return (
        <Container className='justify-content-center'>
            <div>
                <Container className='justify-content-center'>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" name="actividad" onChange={handleChange} placeholder="Actividad" />
                        <Input type="number" name="dedicacionHorasSemanales" onChange={handleChange} placeholder="Dedicación (Horas Semanales)" />
                        <Input type="number" name="dedicacionHorasSemestre" onChange={handleChange} placeholder="Dedicación (Horas Semestre)" />
                        <textarea name="descripcion" onChange={handleChange} placeholder="Descripción de la Actividad"></textarea>
                        
                        <div>
                            <label>
                                <Input type="checkbox" value="Producto1" onChange={handleCheckboxChange} />
                                Producto 1
                            </label>
                            <label>
                                <Input type="checkbox" value="Producto2" onChange={handleCheckboxChange} />
                                Producto 2
                            </label>
                            <label>
                                <Input type="checkbox" value="Producto3" onChange={handleCheckboxChange} />
                                Producto 3
                            </label>
                        </div>

                        <Button type="submit">Enviar</Button>
                        <Button type="button" >Descargar Excel</Button>
                    </Form>
                </Container>

                {/* Modal de mensaje */}
                <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
                    <div className="modal-header">
                        <h5 className="modal-title">Mensaje</h5>
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {modalMessage}
                    </div>
                    <div className="modal-footer">
                        <Button onClick={() => setShowModal(false)}>Cerrar</Button>
                    </div>
                </Modal>
            </div>
        </Container>
    );
}

export default Formulario;
