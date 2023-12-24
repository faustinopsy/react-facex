import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FaceRecognition({ videoRef, isCapture, setCaptureData, setCapture }) {
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
        if (isCapture && modelsLoaded) {
            captureFace();
        }
    }, [isCapture, modelsLoaded]);

    const captureFace = async () => {
        if (!videoRef.current) return;

        const detections = await faceapi.detectAllFaces(
            videoRef.current, 
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceDescriptors();

        if (detections.length > 0) {
            setCaptureData(prevData => [...prevData, detections[0].descriptor]);
            setCapture(false);
        }
    };

    return <div></div>;
}

export default FaceRecognition;
