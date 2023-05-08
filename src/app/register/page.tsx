'use client'

import { useState } from 'react';
import './register.css'

const Register = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const updateCredential = (e:any) => {
        e.preventDefault();
        setCredential(e.target.value);
    }

    const updatePassword = (e:any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleRegister = async (e:any) => {
        e.preventDefault();
        // send login request
    }

    return (
        <div className="register">
            <div className="">
                <h4 className="header">Create an account</h4>
                <h6 className="text
                ">Start managing your business insights better and faster.</h6>
                <form className="register-form">
                    <input type="email" placeholder="Email" className="email" value={credential} onChange={updateCredential}/>
                    <input type="password" placeholder="Password" className="password" value={password} onChange={updatePassword}/>
                    {/* <input type="submit" /> */}
                    <button className="register-button" onClick={handleRegister}>Sign up</button>
                </form>
                <div className="hr-with-text"> or </div>
                <div className="google-button">
                    <button className="google-signup-btn">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="google-logo"/>
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;