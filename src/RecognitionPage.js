import React, { useRef, useEffect,useState } from 'react';
import * as faceapi from 'face-api.js';
import useLoadFaceApiModels from './useLoadFaceApiModels';
import { buscarUsuarios,registrarPresenca } from './utils/api';

function RecognitionPage() {
    const videoRef = useRef(null);
    const modelsLoaded = useLoadFaceApiModels();
    const [usuarios, setUsuarios] = useState([]);
 
    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Falha ao ativar a câmera:", err));
        }
    
        const fetchUsuarios = async () => {
            const fetchedUsuarios = await buscarUsuarios();
            setUsuarios(fetchedUsuarios);
        };
    
        fetchUsuarios();
    }, []);
    

    const compareFaces = async () => {
        if (!modelsLoaded || !videoRef.current) return;

        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                                     .withFaceLandmarks()
                                     .withFaceDescriptor();
        if (!detections) {
            alert("Nenhum rosto detectado.");
            return;
        }

        let matched = false;

        usuarios.forEach(async (userData) => {
            userData.faces.forEach(async (faceArray) => {
                const faceDescriptor = new Float32Array(faceArray);
                if (faceDescriptor.length === detections.descriptor.length) {
                    const distance = faceapi.euclideanDistance(faceDescriptor, detections.descriptor);
                    if (distance < 0.8) { 
                        matched = true;
                        const similarity = (1 - distance) * 100;
                        console.log(`Rosto reconhecido: ${userData.nome} com ${Math.round(similarity)} % de aproximidade`);

                        await registrarPresenca(userData.id, 'E');
                            
                    }
                }
            });
        });
        if (!matched) {
            console.log("Rosto não reconhecido.");
        }
    };

    return (
        <div>
            <div className="camera-container">
            <h1>Reconhecimento Facial</h1>
            <video ref={videoRef} autoPlay={true} style={{ width: '640px', height: '460px' }}></video>
            <button onClick={compareFaces}>Comparar Rosto</button>
            </div>
        </div>
    );
}

export default RecognitionPage;
