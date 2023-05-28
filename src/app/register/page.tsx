'use client'

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from "@supabase/supabase-js";
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';

const Register = () => {
    const { supabase } = useSupabase();
    const [stage, setStage] = useState(1)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState('')
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
            setErrors(JSON.stringify(error));
        }
    }



    return (
        <div className='grid'>
            <AuthLeftPanel />
            <div className='flex items-center justify-center mt-6'>
                <div className="flex flex-col gap-5 w-1/3">
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
                        icon=""
                    />
                    <Button
                        label='Sign Up'
                        onClick={handleRegister}
                        light={false}
                    />
                    {/* divider */}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    {/* Sign up with Google */}
                    <div className="w-full flex justify-center items-center">
                        <button className="flex items-center bg-white text-[#737373] text-[14px]
                                            cursor-pointer pt-[10px] pr-[20px] pb-[10px] pl-[20px]
                                            text-center rounded-md
                                            shadow">
                            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-[18px] h-[18px] mr-[10px]"/>
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
