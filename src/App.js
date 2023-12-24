import React, { useRef } from 'react';
import WebcamCapture from './WebcamCapture';
import FaceRecognition from './FaceRecognition';

function App() {
  const videoRef = useRef(null);

  return (
    <div>
      <WebcamCapture videoRef={videoRef} />
      <FaceRecognition videoRef={videoRef} />
    </div>
  );
}

export default App;
