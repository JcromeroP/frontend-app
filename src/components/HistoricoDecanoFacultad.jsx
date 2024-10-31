import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HistoricoDecano = () => {
  const [agendas, setAgendas] = useState([]);
  const userId = localStorage.getItem('idUser'); 
  const facultad = localStorage.getItem('facultad');

  useEffect(() => {
    const fetchAgendas = async () => {  
      try {
        const response = await axios.get(`http://localhost:8080/api/dean/historicalDean/${userId}`);
        const data = response.data;
        if (data.status === 200 && response.data !== null) {
          setAgendas(data.data);
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Operación exitosa',
            text: 'No hay Histórico de agendas actualmente',
            confirmButtonText: 'Aceptar',
          });
          setAgendas([]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servicio',
          text: 'No se puede conectar con el servicio',
          confirmButtonText: 'Aceptar',
        });
      }
    };
    fetchAgendas();
  }, [userId]);

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


  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Historico Agendas {facultad}</h2>
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
                <button onClick={() => handleDownload(agenda.id)} style={styles.button}>Descargar</button>
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
      backgroundColor: '#28a745', // Color verde para los encabezados
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
      backgroundColor: '#28a745', // Color verde para el botón
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },

  
};

export default HistoricoDecano;
