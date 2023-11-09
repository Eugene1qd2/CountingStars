import React, { useState } from "react";

export const Register = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //add user, submit user, than to log in
        props.onFormSwitch('login');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="login" type="text" placeholder="login" name="login" value={login} onChange={(e) => { setLogin(e.target.value) }} />
            <input id="email" type="email" placeholder="e-mail" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input id="password" type="password" placeholder="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <p>Already have an account? <a onClick={() => { props.onFormSwitch('login') }}>Log in.</a></p>
            <button type="submit">Register</button>
        </form>
    )
}