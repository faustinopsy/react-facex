import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import FaceRecognition from './FaceRegister';
import RecognitionPage from './RecognitionPage'; 
import PresencasRegistradas from './PresencasRegistradas'; 
import UsuariosCadastrados from './UsuariosCadastrados'; 
import { cadastrarUsuario } from './utils/api';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  const videoRef = useRef(null);
  const [capture, setCapture] = useState(false);
  const [captureData, setCaptureData] = useState([]);
  const [formData, setFormData] = useState({ name: '', number: '' });
  const totalCaptures = 3;

  const handleCapture = () => {
    setCapture(prev => !prev);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (captureData.length === 3) {
      const usuario = { nome: formData.name, registro:formData.number, rosto: captureData.map(descriptor => Array.from(descriptor)) };
      cadastrarUsuario(usuario);
      setCaptureData([]);
    }
  };

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={
          <div>
          <div className="camera-container">
            <WebcamCapture videoRef={videoRef} onCapture={handleCapture} />
            <FaceRecognition videoRef={videoRef} isCapture={capture} setCaptureData={setCaptureData} setCapture={setCapture} />
            <p>Capturas: {captureData.length} de {totalCaptures}</p>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Nome" />
            <input type="number" name="number" value={formData.number} onChange={handleFormChange} placeholder="Número" />
            <button onClick={handleSave} disabled={captureData.length !== totalCaptures}>Salvar Dados</button>
          </div>
          </div>
        } />
        <Route path="/recognition" element={<RecognitionPage />} />
        <Route path="/usuarios" element={<UsuariosCadastrados />} />
        <Route path="/presencas" element={<PresencasRegistradas />} />
      </Routes>
    </Router>
  );
}

export default App;
