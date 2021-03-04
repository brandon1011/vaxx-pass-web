import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './style.css';
import VerifiedImage from '../../assets/images/verified.png';
import UnverifiedImage from '../../assets/images/unverified.png';

export default function User(props) {
    const [user, setUser] = useState(null);
    const canvasContainerRef = useRef();

    useEffect(() => {
        if (user) {
            QRCode.toCanvas(user.user_id, { errorCorrectionLevel: "H", width: 180, color: {dark: "#003766", light: "#fff"} }, (err, canvas) => {
                if (err) throw err;
                canvasContainerRef.current.appendChild(canvas);
            });
        } else {
            const url = "https://vaxx-pass-server.herokuapp.com/api/users/12111111";
            
            fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err));
        }
    });

    function renderName() {
        if (user) {
            return user.first_name + " " + user.last_name;
        } else {
            return "";
        }
    }

    function renderImage() {
        if (user) {
            return (
            <div class="status_container">
                <span>{user.vaccine_verified ? "Vaccine verified" : "Not verified"}</span>
                <img id="verify_image" src={user.vaccine_verified ? VerifiedImage : UnverifiedImage} />
            </div>
            );
        } else {
            return "";
        }
    }

    return (
        <div class="account_container">
            <div id="nav_top">
                <span class="sign_out_button">Sign Out</span>
                <div id="user_info_container">
                    <span id="user_full_name">{renderName()}</span>
                    <span id="user_location">Toronto, ON, CA</span>
                </div>
                <span class="settings_button">&#x2699;</span>
            </div>
            <div ref={canvasContainerRef} id="canvas_container"></div>
            {renderImage()}
        </div>
    );
}