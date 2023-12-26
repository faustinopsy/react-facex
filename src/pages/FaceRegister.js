import React, { useState } from 'react';
import * as faceapi from 'face-api.js';
import useLoadFaceApiModels from '../models/useLoadFaceApiModels';
import { cadastrarUsuario } from '../utils/api';

function FaceRegister({ videoRef }) {
    const modelsLoaded = useLoadFaceApiModels();
    const [captureData, setCaptureData] = useState([]);
    const [formData, setFormData] = useState({ name: '', number: '' });
    const totalCaptures = 3;

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (captureData.length === totalCaptures) {
            const usuario = { 
                nome: formData.name, 
                registro: formData.number, 
                rosto: captureData.map(descriptor => Array.from(descriptor)) 
            };
            await cadastrarUsuario(usuario);
            setCaptureData([]);
            setFormData({ name: '', number: '' });
        }
    };

    const captureFace = async () => {
        console.log(modelsLoaded)
        if (!videoRef.current || !modelsLoaded || captureData.length >= totalCaptures) return;

        const detections = await faceapi.detectAllFaces(
            videoRef.current, 
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0) {
            setCaptureData(prevData => [...prevData, detections[0].descriptor]);
        }
    };

    return (
        <div className="camera-container">
            <p>Capturas: {captureData.length} de {totalCaptures}</p>
            <button onClick={captureFace} disabled={captureData.length >= totalCaptures}>Capturar Face</button>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Nome" />
            <input type="number" name="number" value={formData.number} onChange={handleFormChange} placeholder="Número" />
            <button onClick={handleSave} disabled={captureData.length !== totalCaptures}>Salvar Dados</button>
        </div>
    );
}

export default FaceRegister;
