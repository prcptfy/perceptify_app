'use client'

import { useSupabase } from "@/components/supabase-provider"
import { useState, useEffect } from 'react';
import { Session } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import AuthLeftPanel from "@/components/AuthLeftPanel";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Login = () => {
    const router = useRouter();
    const { supabase, session } = useSupabase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const keyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="none"><path stroke="#8915E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.226 16.237A7.892 7.892 0 0 0 23.69 3.311a7.89 7.89 0 0 0-12.926 8.463m4.434 4.493L5.463 26l-4.091-.372L1 21.537l9.733-9.734m8.492-3.993v-.036"/></svg>

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
            <AuthLeftPanel
                title="Lorem Ipsum"
                subtitle='Lörem ipsum perform öreck regt: infrater. Tidådor infrast, sobende om än eurad i telefåvis. Psykocism krobor girade neoplastisk i Tintingate. Märk-dna höska i tregon hödade, i dan. Vav depolig om än kabelt även om jyspemöligt, än relig. '
            />
            <div className='flex items-center justify-center mt-6 w-full'>
                <div className="flex flex-col gap-5 w-1/3">
                    <div>
                        <h1 className='font-bold text-3xl mb-2'>👋🏼 Welcome back!</h1>
                        <p className='text-lg font-extralight'>Get back to managing your business insights.</p>
                    </div>
                    <Input
                            id='email'
                            label='Email'
                            disabled={false}
                            errors={errors}
                            required
                            icon=""
                        />
                        <Input
                            id='password'
                            label='Password'
                            type='password'
                            disabled={false}
                            errors={errors}
                            required
                            icon={keyIcon}
                        />
                        <Button
                            label='Log In'
                            onClick={handleEmailLogin}
                            light={false}
                        />
                </div>
            </div>
        </div>
    )
}

export default Login;
