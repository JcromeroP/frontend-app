import "../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Modal, FormGroup } from "react-bootstrap";
import { Input } from "reactstrap";

const GestionAdministrador = () => {
  const [formDataUser, setFormDataUser] = useState([
    {
      firstName: "Jesus Ariel",
      firstLastName: "Gonzales",
      documentNumber: "123456789",
      password: "jesus1234",
      email: "jesus@gmail.com",
    },
  ]);

  // Estados para la edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (user, index) => {
    setCurrentUser(index);
    setEditedData(user); // Cargamos los datos en el modal
    setShowEditModal(true); // Mostramos el modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Actualizamos el estado de formDataUser con los datos editados
    const updatedUsers = [...formDataUser];
    updatedUsers[currentUser] = editedData;
    setFormDataUser(updatedUsers);

    // Cerramos el modal
    setShowEditModal(false);
  };

  return (
    <>
      <br />
      <Container className="text-success text-start mt-4 p-5">
        <h2>USUARIOS</h2>
      </Container>

      <Container>
        <div className="p-1"> 
          <Table striped bordered hover>
            <thead>
              <tr>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Nombres
                </th>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Apellidos
                </th>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Número de Documento
                </th>
                <th
                  style={{
                    width: "130px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Contraseña
                </th>
                <th
                  style={{
                    width: "200px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    width: "100px",
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {formDataUser.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.firstLastName}</td>
                  <td>{item.documentNumber}</td>
                  <td>{item.password}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleEditClick(item, index)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <label>Nombres</label>
            <Input
              type="text"
              name="firstName"
              value={editedData.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellidos</label>
            <Input
              type="text"
              name="firstLastName"
              value={editedData.firstLastName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Número de Documento</label>
            <Input
              type="text"
              name="documentNumber"
              value={editedData.documentNumber}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Contraseña</label>
            <Input
              name="password"
              value={editedData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleSaveChanges}>
            Actualizar
          </Button>
          <Button variant="danger" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GestionAdministrador;
