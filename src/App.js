import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Registro from './components/Registro'
import Formulario from './components/DocenteFormulario';
import Navbarnew from './components/Navbarnew';
import AprobarDrPrograma from './components/DrPrograma';
import AprobarDecano from './components/Decano';
import GestionAdministrador from './components/Administrador';
import AgendasDocente from './components/AgendasDocente';
import DirectorPrograma  from './components/DirectorPrograma';
import DecanoFacultad from './components/DecanoFacultad';
import HistoricoDecano from './components/HistoricoDecanoFacultad';
import HistoricoDirector from './components/HistoricoDirectorPrograma';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Administracion" element={<Registro />} />
        <Route path="/agendasProfesoresDir" element={<><Navbarnew /><AprobarDrPrograma /></>} />
        <Route path="/agendasProfesoresDec" element={<><Navbarnew /><AprobarDecano /></>} />
        <Route path="/gestionAdministrador" element={<><Navbarnew /><GestionAdministrador/></>}/>
        <Route path="/formulario" element={<><Navbarnew /><Formulario /></>} />
        <Route path="/AgendasDocente" element={<><Navbarnew /><AgendasDocente/></>}/>
        <Route path="/DirectorPrograma"  element={<><Navbarnew /><DirectorPrograma/></>}/>
        <Route path="/Director/HistoricoDirector"  element={<><Navbarnew /><HistoricoDirector/></>}/>
        <Route path="/Decano/Autorizacion_Decano"  element={<><Navbarnew /><DecanoFacultad/></>}/>
        <Route path="/Decano/HistoricoDecano"  element={<><Navbarnew /><HistoricoDecano/></>}/>
      </Routes>
    </Router>
  );
}

export default App;