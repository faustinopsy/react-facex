import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function RecognitionPage() {
    const videoRef = useRef(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            setModelsLoaded(true);
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: {} })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Falha ao ativar a câmera:", err));
        }
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

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('userData')) {
                const userData = JSON.parse(localStorage.getItem(key));
                userData.faces.forEach(faceArray => {
                    const faceDescriptor = new Float32Array(faceArray);
                    if (faceDescriptor.length === detections.descriptor.length) {
                        const distance = faceapi.euclideanDistance(faceDescriptor, detections.descriptor);
                        if (distance < 0.8) { 
                            matched = true;
                            const similarity = (1 - distance) * 100;
                            console.log(`Rosto reconhecido: ${userData.name} com ${Math.round(similarity)} % de aproximidade` );
                        
                            const currentDate = new Date().toLocaleDateString();

                            const attendanceKey = `attendance_${userData.number}`;
                            const existingAttendance = JSON.parse(localStorage.getItem(attendanceKey)) || [];

                            if (!existingAttendance.some(record => record.date === currentDate)) {
                                const attendanceRecord = { date: currentDate, time: new Date().toLocaleTimeString() };
                                existingAttendance.push(attendanceRecord);
                                localStorage.setItem(attendanceKey, JSON.stringify(existingAttendance));
                            }
                        }
                    }
                });
            }
        }
    
        if (!matched) {
            console.log("Rosto não reconhecido.");
        }
    };

    return (
        <div>
            <h1>Reconhecimento Facial</h1>
            <video ref={videoRef} autoPlay={true} style={{ width: '720px', height: '560px' }}></video>
            <button onClick={compareFaces}>Comparar Rosto</button>
        </div>
    );
}

export default RecognitionPage;
