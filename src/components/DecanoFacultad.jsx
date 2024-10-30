import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import ExcelJS from "exceljs";

const DecanoFacultad = () => {
  const [agendas, setAgendas] = useState([]);
  const idUsuario = localStorage.getItem('idUser'); 
  const name = localStorage.getItem('name');
    const facultad = localStorage.getItem('facultad')
  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/decano/agentodecano/${idUsuario}`);
        const data = response.data;
        if (response.data.status === 200 || response.data.status === 201) {
          setAgendas(data.data);
        }
        if (response.data.status === 400 || response.data.status === 403 || response.data.status === 401 || response.data.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Error En el inicio de sesion',
            text: data.message || 'Por favor inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: error.response?.data?.message || 'Ocurrió un error al intentar obtener las agendas.',
          confirmButtonText: 'Aceptar'
        });
      }
    };

    fetchAgendas();
  }, []);

  const handleDownload = async (agendaId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/agendas/download/${agendaId}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Agenda_${agendaId}.xlsx`;
      link.click();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleDownloadAndEdit = async (agendaId, decision) => {

    const result = await Swal.fire({
      title: decision ? '¿Estás seguro que quieres aprobar la agenda?' : '¿Estás seguro que quieres rechazar la agenda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isDismissed) {
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/api/agendas/download/${agendaId}`, {
        responseType: 'arraybuffer', 
      });
  
      const buffer = response.data;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
  
      const worksheet = workbook.getWorksheet(1);
      worksheet.getCell('D77').value = localStorage.getItem('email');
      worksheet.getCell('D78').value = localStorage.getItem('name');
  

      const editedBuffer = await workbook.xlsx.writeBuffer();
  
      const formData = new FormData();
      const blob = new Blob([editedBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      formData.append('file', blob, `Agenda_edited_${agendaId}.xlsx`);
      formData.append('decision', decision); 
      formData.append('idAgenda', agendaId);
  
      const responseUpload = await axios.post("http://localhost:8080/api/decano/updatedecano", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (responseUpload.status === 200 || responseUpload.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Operación exitosa',
          text: `La agenda ha sido ${decision ? 'aprobada' : 'rechazada'}.`,
          confirmButtonText: 'Aceptar',
        });
        reloadPage();
      }
    } catch (error) {
      console.error('Error al procesar el archivo o realizar la decisión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la operación',
        text: 'Ocurrió un error al intentar enviar la decisión.',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  const reloadPage = () => {
    window.location.reload();
  };
    return (
    <div style={styles.page}>
      <h2 style={styles.title}>Agendas Por Aprobar del decano {name} {facultad}</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Nombre del Archivo</th>
            <th style={styles.th}>Facultad</th>
            <th style={styles.th}>Programa</th>
            <th style={styles.th}>Fecha de Creación</th>
            <th style={styles.th}>Aprobación Decano</th>
            <th style={styles.th}>Aprobación Director</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agendas.map(agenda => (
            <tr key={agenda.id}>
              <td style={styles.td}>{agenda.nombreArchivo}</td>
              <td style={styles.td}>{agenda.facultad}</td>
              <td style={styles.td}>{agenda.programa}</td>
              <td style={styles.td}>{new Date(agenda.fechaCreacion).toLocaleString()}</td>
              <td style={styles.td}>{agenda.aprobacionDecano == null ? 'pendiente' : (agenda.aprobacionDecano ? 'Sí' : 'No')}</td>
              <td style={styles.td}>{agenda.aprobacionDirectorPrograma ==null ? 'pendiente' :(agenda.aprobacionDirectorPrograma ? 'Sí': 'No')}</td>
              <td style={styles.td}>
                <button onClick={() => handleDownload(agenda.id)} style={styles.button}>
                  <FontAwesomeIcon icon={faDownload} /> </button>
                <button onClick={() => handleDownloadAndEdit(agenda.id, true)} style={styles.approveButton}>
                  <FontAwesomeIcon icon={faCheck} /> </button>
                <button onClick={() => handleDownloadAndEdit(agenda.id, false)} style={styles.rejectButton}>
                  <FontAwesomeIcon icon={faTimes} /> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  title: {
    color: '#28a745',
    marginBottom: '20px',
  },
  table: {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  th: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px',
  },
  approveButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  rejectButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default DecanoFacultad;
