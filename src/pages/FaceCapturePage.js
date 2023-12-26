import React from 'react';
import WebcamCapture from '../WebcamCapture';
import FaceRegister from './FaceRegister';

const FaceCapturePage = ({ videoRef }) => {
    return (
        <div className="camera-container">
            <WebcamCapture videoRef={videoRef} />
            <FaceRegister videoRef={videoRef} />
        </div>
    );
}

export default FaceCapturePage;
