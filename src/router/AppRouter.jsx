import { Route, Routes, Navigate } from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import ProtectedRoute from './components/ProtectedRoute';

export const AppRouter = () => {
    return (
        <Routes>
            {/*Rutas Publicas*/}
            <Route path="/" element={<Login />} />
            <Route path="/Administracion" element={<Registro />} />
        </Routes>
    );
};