import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import useLoadFaceApiModels from './useLoadFaceApiModels';

function FaceRegister({ videoRef, isCapture, setCaptureData, setCapture }) {
    const modelsLoaded = useLoadFaceApiModels();

    useEffect(() => {
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

        if (isCapture && modelsLoaded) {
            captureFace();
        }
    }, [isCapture, modelsLoaded, videoRef, setCaptureData, setCapture]); 

    return <div></div>;
}

export default FaceRegister;
