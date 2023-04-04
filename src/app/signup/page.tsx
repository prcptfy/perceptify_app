'use client'

import { useSupabase } from "@/components/supabase-provider"
import { useState, useEffect } from 'react';
import NicePageContent from "@/components/NiceContent";
import { Session } from "@supabase/supabase-js";

const SignUp = () => {
    const { supabase } = useSupabase();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }} = await supabase.auth.getSession();
            console.log('session', session);
            setSession(session);
        }
        fetchSession().catch(console.error);
    }, []);

    const handleEmailLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({
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
    };


    return (
        <NicePageContent title="Sign Up">
            <div className="flex flex-col w-1/3 max-w-[300px]">
                <label>Username</label>
                <input
                    type='text'
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
                <label>First Name</label>
                <input
                    type='text'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                />
                <label>Last Name</label>
                <input
                    type='text'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                />
                <label>Email</label>
                <input
                    type='text'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password</label>
                <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <button
                    onClick={session ? handleEmailLogin : handleSignUp}
                >{session ? `Log In` : `Sign Up`}</button>
            </div>
        </NicePageContent>
    )
}

export default SignUp;
