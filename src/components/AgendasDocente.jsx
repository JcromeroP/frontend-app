import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AgendasTable = () => {
  const [agendas, setAgendas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [rowsPerPage] = useState(5); // Cantidad de filas por página (5 por defecto)
  const userId = localStorage.getItem('idUser'); 
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchAgendas = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/agendas/user/${userId}`);
        console.log('Response from backend:', response.data);  
        setAgendas(response.data);
      } catch (error) {
        console.error('Error fetching agendas:', error);
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

  // Paginación
  const indexOfLastAgenda = currentPage * rowsPerPage;
  const indexOfFirstAgenda = indexOfLastAgenda - rowsPerPage;
  const currentAgendas = agendas.slice(indexOfFirstAgenda, indexOfLastAgenda);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(agendas.length / rowsPerPage);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Agendas del Docente {name}</h2>

      {/* Mostrar conteo de registros */}
      <div style={styles.info}>
        Mostrando {currentAgendas.length} de {agendas.length} registros
      </div>

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
          {currentAgendas.map(agenda => (
            <tr key={agenda.id}>
              <td style={styles.td}>{agenda.nombreArchivo}</td>
              <td style={styles.td}>{agenda.facultad}</td>
              <td style={styles.td}>{agenda.programa}</td>
              <td style={styles.td}>{new Date(agenda.fechaCreacion).toLocaleString()}</td>
              <td style={styles.td}>{agenda.aprobacionDecano == null ? 'Pendiente' : (agenda.aprobacionDecano ? 'Sí' : 'No')}</td>
              <td style={styles.td}>{agenda.aprobacionDirectorPrograma == null ? 'Pendiente' : (agenda.aprobacionDirectorPrograma ? 'Sí' : 'No')}</td>
              <td style={styles.td}>
                <button onClick={() => handleDownload(agenda.id)} style={styles.button}>
                  Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} style={styles.pageButton}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '100px', // Aumentar el espacio superior para evitar el navbar fijo
    backgroundColor: '#f4f4f4',
  },
  title: {
    color: '#28a745',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '10px',
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
  },
  pagination: {
    marginTop: '20px',
  },
  pageButton: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AgendasTable;
