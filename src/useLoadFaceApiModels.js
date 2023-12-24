import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const useLoadFaceApiModels = () => {
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

    return modelsLoaded;
};

export default useLoadFaceApiModels;
