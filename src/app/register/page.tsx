'use client'

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from "@supabase/supabase-js";
import './register.css'

const Register = () => {
    const { supabase } = useSupabase();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [session, setSession] = useState<Session | null>(null);

    // useEffect(() => {
    //     const fetchSession = async () => {
    //         const { data: { session }} = await supabase.auth.getSession();
    //         console.log('session', session);
    //         setSession(session);
    //     }
    //     fetchSession().catch(console.error);
    // }, []);

    // const updateCredential = (e:any) => {
    //     e.preventDefault();
    //     setCredential(e.target.value);
    // }

    // const updatePassword = (e:any) => {
    //     e.preventDefault();
    //     setPassword(e.target.value);
    // }

    const handleRegister = async (e:any) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        });
        if (error) {
            console.log('error', error);
        }
    }

    return (
        <div className="register">
            <div className="">
                <h4 className="header">Create an account</h4>
                <h6 className="text
                ">Start managing your business insights better and faster.</h6>
                <form className="register-form">
                    <input type="text" placeholder="First Name" className="email" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <input type="text" placeholder="Last Name" className="email" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <input type="text" placeholder="Username" className="email" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="email" placeholder="Email" className="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" className="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
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
