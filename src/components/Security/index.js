import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import './style.css';
import Scanner from '../Scanner';
import VerifiedImage from '../../assets/images/verified.png';
import UnverifiedImage from '../../assets/images/unverified.png';

export default function Security(props) {
    const [user, setUser] = useState();
    const [scanning, setScanning] = useState(false);

    function getScannedData(data) {
        setScanning(false);
        
        fetch("https://vaxx-pass-server.herokuapp.com/api/users/" + data, {
            method: "GET",
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
        })
        .catch(err => console.log(err));
    }

    function renderVerification() {
        if (user) {
            return (
                <div class="status_container">
                    <span>{user.vaccine_verified ? "Vaccine verified" : "Not verified"}</span>
                    <img id="verify_image" src={user.vaccine_verified ? VerifiedImage : UnverifiedImage} />
                </div>
            );
        }
    }

    function renderVisitorName() {
        if (user) {
            return (
                <span id="visitor_name">{user.first_name + " " + user.last_name}</span>
            );
        }
    }

    function renderSecurity() {
        if (scanning) {
            return (
                <div id="scanner_container">
                    <span id="close_scanner">&#10005;</span>
                    <Scanner getScannedData={getScannedData} dimensions={{ width: window.innerWidth, height: window.innerHeight }} />
                    <div id="scanner_footer">
                        <p>Hover over QR code!</p>
                    </div>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div id="nav_top">
                        <span class="sign_out_button">Sign Out</span>
                        <span class="security_name">Security</span>
                        <span class="settings_button">&#x2699;</span>
                    </div>
                    <div id="photo_id_container">
                        <div id="dummy"></div>
                        <div id="photo_id_inner" style={{ backgroundImage: `url(${user ? user.display_photo : ""})` }}></div>
                    </div>
                    {renderVisitorName()}
                    {renderVerification()}
                    <div onClick={() => setScanning(true)} id="start_scan_button">
                        <span>Scan</span>
                        &#128247;
                    </div>
                </React.Fragment>
            );
        }
    }

    return (
        <div class="account_container">
            {renderSecurity()}
        </div>
    );
}