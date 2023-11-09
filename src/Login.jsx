import React, { useState } from "react"

export const Login = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    onload(window, event){
        setErrorMessage(props.errorMessage == '' ? "Something went wrong" : props.errorMessage);
        console.log(123);
    }

    const onLoad = (e) => {
        setErrorMessage(props.errorMessage == '' ? "Something went wrong" : props.errorMessage);
        console.log(123);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLogin(login, password);
        setErrorMessage(props.errorMessage == '' ? "Something went wrong" : props.errorMessage);
    }

    return (
        <form onSubmit={handleSubmit} onLoad={onLoad}>
            <input id="login" type="text" placeholder="login" name="login" value={login} onChange={(e) => { setLogin(e.target.value) }} />
            <input id="password" type="password" placeholder="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <p>{errorMessage}</p>
            <p>Not registered yet? <a onClick={() => { props.onFormSwitch('register') }}>Sign in.</a></p>
            <button type="submit">Log in</button>
        </form>
    )

}