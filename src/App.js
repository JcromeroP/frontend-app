// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Formulario from './components/DocenteFormulario';
import Navbarnew from './components/Navbarnew';
import AprobarDrPrograma from './components/DrPrograma';
import AprobarDecano from './components/Decano';
import GestionAdministrador from './components/Administrador';
import AgendasDocente from './components/AgendasDocente';
import DirectorPrograma from './components/DirectorPrograma';
import DecanoFacultad from './components/DecanoFacultad';
import HistoricoDecano from './components/HistoricoDecanoFacultad';
import HistoricoDirector from './components/HistoricoDirectorPrograma';
import ProtectedRoute from './router/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>

        
        <Route path="/" element={<Login />} />
        <Route path="/Administracion" element={<Registro />} />

        {/* Rutas protegidas por rol */}
        <Route 
          path="/gestionAdministrador" 
          element={
            <ProtectedRoute requiredRole="Admin">
              <><Navbarnew /><GestionAdministrador /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/formulario" 
          element={
            <ProtectedRoute requiredRole="Docente">
              <><Navbarnew /><Formulario /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/AgendasDocente" 
          element={
            <ProtectedRoute requiredRole="Docente">
              <><Navbarnew /><AgendasDocente /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/DirectorPrograma"  
          element={
            <ProtectedRoute requiredRole="Director De programa">
              <><Navbarnew /><DirectorPrograma /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/Director/HistoricoDirector"  
          element={
            <ProtectedRoute requiredRole="Director De programa">
              <><Navbarnew /><HistoricoDirector /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/Decano/Autorizacion_Decano"  
          element={
            <ProtectedRoute requiredRole="Decano">
              <><Navbarnew /><DecanoFacultad /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/Decano/HistoricoDecano"  
          element={
            <ProtectedRoute requiredRole="Decano">
              <><Navbarnew /><HistoricoDecano /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/agendasProfesoresDir" 
          element={
            <ProtectedRoute requiredRole="Director De programa">
              <><Navbarnew /><AprobarDrPrograma /></>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/agendasProfesoresDec" 
          element={
            <ProtectedRoute requiredRole="Decano">
              <><Navbarnew /><AprobarDecano /></>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
