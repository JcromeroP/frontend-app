import axios from 'axios';

const API_URL = 'http://localhost:8080/api/excel/data'; 

// Función para obtener los datos del archivo Excel
const getExcelData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Excel data:', error);
    throw error;
  }
};

export default {
  getExcelData,
};
