'use client'

import { useSupabase } from "@/components/supabase-provider"
import { useState, useEffect } from 'react';
import { Session } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import AuthLeftPanel from "@/components/AuthLeftPanel";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const { supabase, session } = useSupabase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false)

    const keyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="none"><path stroke="#8915E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.226 16.237A7.892 7.892 0 0 0 23.69 3.311a7.89 7.89 0 0 0-12.926 8.463m4.434 4.493L5.463 26l-4.091-.372L1 21.537l9.733-9.734m8.492-3.993v-.036"/></svg>
    const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" fill="none">
        <path fill="#8915E4" d="M24.777 4.688H3.348a1.786 1.786 0 0 0-1.785 1.785V20.76a1.786 1.786 0 0 0 1.785 1.786h21.429a1.786 1.786 0 0 0 1.785-1.786V6.473a1.786 1.786 0 0 0-1.785-1.785Zm-1.965 1.785-8.75 6.054-8.75-6.054h17.5ZM3.349 20.76V7.286l10.206 7.062a.893.893 0 0 0 1.017 0l10.206-7.062v13.473H3.348Z"/>
    </svg>

    async function handleEmailLogin(e:any) {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        // console.log(email, password)
        error ? console.log('error', error) : router.push('/dashboard');
    };

    useEffect(() => console.log(session), [session]);


    if (!session) return (
        <div className="flex">
            <AuthLeftPanel
                title="Lorem Ipsum"
                subtitle='Lörem ipsum perform öreck regt: infrater. Tidådor infrast, sobende om än eurad i telefåvis. Psykocism krobor girade neoplastisk i Tintingate. Märk-dna höska i tregon hödade, i dan. Vav depolig om än kabelt även om jyspemöligt, än relig. '
            />
            <div className='flex items-center justify-center mt-6 w-full'>
                <form className="flex flex-col gap-5 w-1/3" onSubmit={handleEmailLogin}>
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
                            icon={emailIcon}
                            onChange={(e:any) => setEmail(e.target.value)}
                        />
                        <Input
                            id='password'
                            label='Password'
                            type={showPassword ? "text" : "password"}
                            disabled={false}
                            errors={errors}
                            required
                            icon={keyIcon}
                            onChange={(e:any) => setPassword(e.target.value)}
                        />
                        <Link href="/forgot-password" className="text-purple-450 hover:font-semibold">Forgot Password?</Link>
                        <Button
                            label='Log In'
                            onClick={handleEmailLogin}
                            light={false}
                        />
                </form>
            </div>
        </div>
    );
    else router.push("/home")
}

export default Login;
