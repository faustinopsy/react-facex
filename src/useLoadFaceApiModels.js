import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const useLoadFaceApiModels = () => {
    const [modelsLoaded, setModelsLoaded] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri(process.env.PUBLIC_URL + '/models');
                await faceapi.nets.faceRecognitionNet.loadFromUri(process.env.PUBLIC_URL +'/models');
                await faceapi.nets.ssdMobilenetv1.loadFromUri(process.env.PUBLIC_URL + '/models')
                await faceapi.nets.faceLandmark68Net.loadFromUri(process.env.PUBLIC_URL + '/models')
                setModelsLoaded(true);
            } catch (error) {
                console.error("Falha ao carregar modelos face-api:", error);
            }
        };

        loadModels();
    }, []);

    return modelsLoaded;
};

export default useLoadFaceApiModels;
