import React, { useState, useEffect } from 'react';

function WebcamCapture({ videoRef, onCapture }) {
    const [isCameraActive, setIsCameraActive] = useState(false);

    const toggleCamera = () => {
        if (isCameraActive) {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        } else {
            activateCamera();
        }
        setIsCameraActive(!isCameraActive);
    };

    const activateCamera = () => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [videoRef]);

    return (
        <div style={{ position: 'relative', width: '640px', height: '480px' }}> 
            <video ref={videoRef} autoPlay={true} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} id="canvas" />
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
                <button onClick={toggleCamera}>{isCameraActive ? 'Desativar Câmera' : 'Ativar Câmera'}</button>
                <button onClick={onCapture} disabled={!isCameraActive}>Capturar</button>

            </div>
        </div>
    );
}

export default WebcamCapture;
