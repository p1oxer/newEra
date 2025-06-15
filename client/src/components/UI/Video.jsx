import React, { useRef, useEffect } from "react";

export default function Video({ video, resetVideo }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (resetVideo && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Сбросить время воспроизведения, если нужно
        }
    }, [resetVideo]);

    return (
        <div className="video">
            <video ref={videoRef} controls>
                <source src={`${video}`} type="video/mp4" />
            </video>
        </div>
    );
}
