import React, { useRef, useState } from 'react';
import WebcamCapture from './WebcamCapture';
import FaceRecognition from './FaceRecognition';

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
        const dataToSave = { ...formData, faces: captureData };
        localStorage.setItem(`userData${formData.number}`, JSON.stringify(dataToSave));
        alert('Dados salvos com sucesso!');
        setCaptureData([]);
    }
  };

  return (
      <div>
          <WebcamCapture videoRef={videoRef} onCapture={handleCapture} />
          <FaceRecognition videoRef={videoRef} isCapture={capture} setCaptureData={setCaptureData} setCapture={setCapture} />
          <p>Capturas: {captureData.length} de {totalCaptures}</p>
          <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Nome"
          />
          <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleFormChange}
              placeholder="Número"
          />
          <button onClick={handleSave} disabled={captureData.length !== totalCaptures}>Salvar Dados</button>
      </div>
  );
}

export default App;
