'use client'

import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from "@supabase/supabase-js";
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import ClientOnly from '@/components/ClientOnly';
import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
    const { supabase } = useSupabase();
    const [stage, setStage] = useState(1)
    const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState('')
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }} = await supabase.auth.getSession();
            console.log('session', session);
            setSession(session);
        }
        fetchSession().catch(console.error);
    }, []);

    useEffect(() => console.log(stage), [stage]);

    const updateCredential = (e:any) => {
        e.preventDefault();
        setCredential(e.target.value);
    }

    const updatePassword = (e:any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const keyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="none"><path stroke="#8915E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.226 16.237A7.892 7.892 0 0 0 23.69 3.311a7.89 7.89 0 0 0-12.926 8.463m4.434 4.493L5.463 26l-4.091-.372L1 21.537l9.733-9.734m8.492-3.993v-.036"/></svg>
    const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" fill="none">
        <path fill="#8915E4" d="M24.777 4.688H3.348a1.786 1.786 0 0 0-1.785 1.785V20.76a1.786 1.786 0 0 0 1.785 1.786h21.429a1.786 1.786 0 0 0 1.785-1.786V6.473a1.786 1.786 0 0 0-1.785-1.785Zm-1.965 1.785-8.75 6.054-8.75-6.054h17.5ZM3.349 20.76V7.286l10.206 7.062a.893.893 0 0 0 1.017 0l10.206-7.062v13.473H3.348Z"/>
    </svg>

    const handleRegister = async (e:any) => {
        const { data, error } = await supabase.auth.signUp({
            email: credential,
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

    const stages = new Map();
    stages.set(1, (
        <div className='flex'>
            <AuthLeftPanel
                title="Lorem Ipsum"
                subtitle='Lörem ipsum perform öreck regt: infrater. Tidådor infrast, sobende om än eurad i telefåvis. Psykocism krobor girade neoplastisk i Tintingate. Märk-dna höska i tregon hödade, i dan. Vav depolig om än kabelt även om jyspemöligt, än relig. '
            />
            <div className='flex items-center justify-center mt-6 w-full'>
                <div className="flex flex-col gap-5 w-1/3">
                    <div>
                        <h1 className='font-bold text-3xl mb-2'>Create an account</h1>
                        <p className='text-lg font-extralight'>Start managing your business insights better and faster.</p>
                    </div>
                    <Input
                        id='email'
                        label='Email'
                        disabled={false}
                        errors={errors}
                        required
                        icon={emailIcon}
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
                    <Input
                        id='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        disabled={false}
                        errors={errors}
                        required
                        icon={keyIcon}
                    />
                    <Button
                        label='Next →'
                        onClick={() => setStage(stage + 1)}
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
    ));
    stages.set(2, "stage 2");
    stages.set(3, "stage 3");

    // return (
    //     <ClientOnly>
    //         {stages.get(stage)}
    //     </ClientOnly>
    // );

    return (
        <div>
            <Link href="/home">
                <Image
                    alt="logo"
                    className="h-24 w-max absolute"
                    height="250"
                    width="250"
                    src="/images/logo.svg"
                />
            </Link>
            <div className='flex flex-col border justify-center items-center h-screen'>
                <h1 className='font-bold text-3xl p-5'>Tell us about yourself!</h1>
                <div className='grid grid-rows-2 grid-flow-col gap-4 w-5/12'>
                    <Input
                        id='firstName'
                        label='First Name'
                        disabled={false}
                        errors={errors}
                        required
                    />
                    <Input
                        id='lastName'
                        label='Last Name'
                        disabled={false}
                        errors={errors}
                        required
                    />
                    <Input
                        id='companyName'
                        label='Company Name'
                        disabled={false}
                        errors={errors}
                        required
                    />
                    <Input
                        id='role'
                        label='Your Position'
                        disabled={false}
                        errors={errors}
                        required
                    />
                </div>
                <div className="m-5 w-80">
                    <Button
                        label='Next →'
                        onClick={() => setStage(stage + 1)}
                        light={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Register;
