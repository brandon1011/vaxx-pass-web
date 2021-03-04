import React, { useState } from 'react';
import './style.css';

export default function Login(props) {
    const [account, setAccount] = useState("");
    const [pass, setPass] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            first_name: "Helios",
            last_name: "Chan",
            user_id: account,
            address: {
                building: "123",
                coord: [111.1, -57.12],
                street: "Steeles Ave W",
                postal_code: "A1B 2C3"
            }
        };

        const url = "https://vaxx-pass-server.herokuapp.com/api/user";
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div id="container">
            <div id="logo_area">
                <span id="logo">&#10003;</span>
                <span id="app_name">Vaxx Pass</span>
            </div>
            <form onSubmit={handleSubmit} id="login_form">
                <div id="input_container">
                    <input onChange={e => setAccount(e.target.value)} class="login_input" placeholder="Account #" />
                    <input onChange={e => setPass(e.target.value)} class="login_input" placeholder="Password" type="password" />
                </div>
                <hr />
                <button id="login_button" type="submit">CONTINUE</button>
            </form>
        </div>
    );
}