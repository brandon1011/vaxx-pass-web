import React, { useState, useEffect, useRef } from 'react';
import QrcodeDecoder from 'qrcode-decoder';
import './style.css';

function Scanner(props) {
    const [dimensions] = useState(props.dimensions);
    const [scanning, setScanning] = useState(false);
    const [begun, setBegun] = useState(false);
    const [link, setLink] = useState("");
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        if (!begun) {
            setBegun(true);
        }
    });

    useEffect(() => {
        if (begun) {
            videoRef.current.width = dimensions.width;
            videoRef.current.height = dimensions.height;

            navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" }})
            .then(stream => {
                videoRef.current.srcObject = stream;
                setScanning(true);
                tick();
                scan();
            });
        }
    }, [begun]);

    function tick() {
        const canvasEl = canvasRef.current;
        const videoEl = videoRef.current;
        const canvas = canvasEl.getContext("2d");

        canvasEl.width = dimensions.width;
        canvasEl.height = dimensions.height;
        
        canvas.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    }

    function scan() {
        tick();

        const canvasEl = canvasRef.current;
        const img = canvasEl.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let qd = new QrcodeDecoder();

        qd.decodeFromImage(img).then(res => {
            if (res) {
                setScanning(false);
                videoRef.current.pause();
                videoRef.current.srcObject.getTracks().forEach(track => {
                    track.stop();
                });
                videoRef.current.removeAttribute("src");
                videoRef.current.load();
                props.getScannedData(res.data);
            } else {
                setTimeout(scan, 300);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    function handleCanPlay() {
        videoRef.current.play().catch(err => {
            console.log(err);
        });
    }

    return (
        <div style={{width: dimensions.width + "px", height: dimensions.height + "px"}} id="component">
            <canvas ref={canvasRef} hidden={true} id="qr_canvas"></canvas>
            <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted></video>
        </div>
    );
}

export default Scanner;