'use client'

import { useSupabase } from "@/components/supabase-provider"
import { useState } from 'react';
import NicePageContent from "@/components/NiceContent";

const Login = () => {
    const { supabase } = useSupabase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

    return (
        <NicePageContent title='Log In'>
            <div className="flex flex-col w-1/3 max-w-[300px]">
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
                >Log in with Email</button>
            </div>
        </NicePageContent>
    )
}

export default Login;
