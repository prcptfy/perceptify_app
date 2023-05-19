'use client'

import { useSupabase } from "@/components/supabase-provider"
import { useState, useEffect } from 'react';
import NicePageContent from "@/components/NiceContent";
import { Session } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import AuthLeftPanel from "@/components/AuthLeftPanel";

const Login = () => {
    const router = useRouter();
    const { supabase, session } = useSupabase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        error ? console.log('error', error) : router.push('/dashboard');
    };

    // useEffect(() => console.log(session), [session])


    if (!session) return (
        <div className="flex">
            <AuthLeftPanel />
            <div className="flex flex-col w-full">
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
                <button
                    onClick={handleEmailLogin}
                >Log In</button>
            </div>
        </div>
    )
}

export default Login;
