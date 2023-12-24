import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';

function FaceRecognition({ videoRef }) {
    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); 
        };

        loadModels().then(() => {
            startFaceDetection();
        });
    }, [videoRef]);

    const startFaceDetection = () => {
        setInterval(async () => {
            if (!videoRef.current) return;

            const detections = await faceapi.detectAllFaces(
                videoRef.current, 
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks().withFaceDescriptors();

            if (detections.length > 0) {
                console.log(detections);
            }
        }, 100);
    }

    return <div></div>;
}

export default FaceRecognition;
