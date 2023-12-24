import React, { useEffect } from 'react';

function WebcamCapture({ videoRef }) {
    useEffect(() => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                })
                .catch(err => console.log(err));
        }
    }, [videoRef]);

    return <video ref={videoRef} autoPlay={true} />;
}

export default WebcamCapture;
