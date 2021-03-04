import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './style.css';
import VerifiedImage from '../../assets/images/verified.png';
import UnverifiedImage from '../../assets/images/unverified.png';

export default function User(props) {
    const [user, setUser] = useState({
        fname: "Jacob",
        lname: "Masterson",
        city: "Toronto",
        prov: "ON",
        country: "CA",
        id: "12345622",
        verification_status: false
    });
    const canvasContainerRef = useRef();

    useEffect(() => {
        if (user) {
            console.log('hi');
            QRCode.toCanvas(user.id, { errorCorrectionLevel: "H", width: 180, color: {dark: "#003766", light: "#fff"} }, (err, canvas) => {
                if (err) throw err;
                canvasContainerRef.current.appendChild(canvas);
            });
        }
    });

    return (
        <div class="account_container">
            <div id="nav_top">
                <span class="sign_out_button">Sign Out</span>
                <div id="user_info_container">
                    <span id="user_full_name">{user.fname + " " + user.lname}</span>
                    <span id="user_location">{user.city + ", " + user.prov + ", " + user.country}</span>
                </div>
                <span class="settings_button">&#x2699;</span>
            </div>
            <div ref={canvasContainerRef} id="canvas_container"></div>
            <div class="status_container">
                <span>{user.verification_status ? "Vaccine verified" : "Not verified"}</span>
                <img id="verify_image" src={user.verification_status ? VerifiedImage : UnverifiedImage} />
            </div>
        </div>
    );
}