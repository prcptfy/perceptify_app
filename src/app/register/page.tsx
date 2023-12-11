'use client'

import React, { useState, useEffect, useRef, MouseEventHandler } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from "@supabase/supabase-js";
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLeftPanel from '@/components/AuthLeftPanel';
import ClientOnly from '@/components/ClientOnly';
import CoverImageUpload from '@/components/CoverImageUpload';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import Dropdown from '@/components/Dropdown';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getImageSize } from 'next/dist/server/image-optimizer';
// import Logo from '@/components/Logo';

const Register = () => {
    const { supabase } = useSupabase();
    const router = useRouter();
    const [stage, setStage] = useState(1)
    const [username, setUsername] = useState('');
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState("");
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState('')
    // const [session, setSession] = useState<Session | null>(null);
    const [members, setMembers] = useState([['', '', '']]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }} = await supabase.auth.getSession();
            if (session) router.push("/home")
            console.log('session', session);
            console.log(session?.user.user_metadata.first_name + ' ' + session?.user.user_metadata.last_name);
        }
        fetchSession().catch(console.error);
    }, []);

    useEffect(() => console.log(stage), [stage]);

    useEffect(() => console.log(members), [members])

    useEffect(() => setMembers(members), [members])

    useEffect(() => {
        console.log(
            `
                email: ${credential}\n
                password: ${password}\n
                firstName: ${firstName}\n
                lastName: ${lastName}\n
                members: ${members}
            `

        )
    }, [credential, password, firstName, lastName, members]);

    const isDisabled = () => {
        if (!password || !confirmPassword || !credential || !firstName || !lastName) return true;
        else if (password !== confirmPassword) return true;
        else return false;
    }

    const updateCredential = (e:any) => {
        e.preventDefault();
        setCredential(e.target.value);
    }

    const updatePassword = (e:any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    async function sendInvites(addedMembers:string[][]) {
        for (let i = 0; i < addedMembers.length; i++) {
            const member = addedMembers[i];
            const [email, first_name, last_name] = member;
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: process.env.NODE_ENV === "development" ? 'http://localhost:3000/home' : 'https://perceptify-app.vercel.app/home',
                    data: {
                        first_name,
                        last_name,
                    }
                }
            });
        }
    }

    const keyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="none"><path stroke="#8915E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.226 16.237A7.892 7.892 0 0 0 23.69 3.311a7.89 7.89 0 0 0-12.926 8.463m4.434 4.493L5.463 26l-4.091-.372L1 21.537l9.733-9.734m8.492-3.993v-.036"/></svg>
    const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" fill="none">
        <path fill="#8915E4" d="M24.777 4.688H3.348a1.786 1.786 0 0 0-1.785 1.785V20.76a1.786 1.786 0 0 0 1.785 1.786h21.429a1.786 1.786 0 0 0 1.785-1.786V6.473a1.786 1.786 0 0 0-1.785-1.785Zm-1.965 1.785-8.75 6.054-8.75-6.054h17.5ZM3.349 20.76V7.286l10.206 7.062a.893.893 0 0 0 1.017 0l10.206-7.062v13.473H3.348Z"/>
    </svg>

    const handleRegister = async (e:any) => {
        const { data, error } = await supabase.auth.signUp({
            email: credential,
            password,
        });
        if (error) {
            console.log('error', error);
            setErrors(JSON.stringify(error));
        } else {
            location.href = '/register/create-profile'
        }
        console.log(data)
    }

    const signInOauth = async (e:any) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: process.env.NODE_ENV === "development" ? 'http://localhost:3000/home' : 'https://perceptify-app.vercel.app/home',
            }
        });
        if (error) {
            console.log("error", error);
            setErrors(JSON.stringify(error));
        } else {
            location.href = '/home'
        }
        console.log(data)
    }

    // async function uploadImage(e:any) {
    //     const file = e.target.files[0];
    //     const uuid = supabase.auth.getUser()?.id;

    //     setProfilePicture(file);

    //     const { data, error } = await supabase
    //         .storage
    //         .from('avatars')
    //         .upload(file)

    //     if (data)
    //         getImage('avatars', uuid);
    //     else
    //         console.log("error getting image")
    // }

    // async function getImage(bucket: string, imageName: string) {
    //     const { data, error } = await supabase
    //         .storage
    //         .from(bucket)
    //         .list('', {
    //             limit: 1,
    //             offset: 0,
    //             sortBy: {
    //                 column: 'name',
    //                 order: 'asc'
    //             }
    //         })
    // }

    const stages = new Map();
    stages.set(1, (
        <div className='flex'>
            <AuthLeftPanel
                 title="Learn What the people think."
                 subtitle='Powerful relevance and sentiment analytics for brand performance. Data-driven, actionable insights and recommendations for marketing strategies. Streamlined integrations and customization. A beautifully refreshing and seamless take on marketing infrastructure, built for you. '
            />
            <div className='flex items-center justify-center mt-6 w-full'>
                <div className="flex flex-col gap-5 w-1/3">
                    <div>
                        <h1 className='font-bold text-3xl mb-2'>Create an account</h1>
                        <p className='text-lg font-extralight'>Start managing your business insights better and faster.</p>
                    </div>
                    {/* <Input
                        id='firstName'
                        label='First Name'
                        disabled={false}
                        errors={errors}
                        required
                        // icon={emailIcon}
                        onChange={(e:any) => setFirstName(e.target.value)}
                    />
                    <Input
                        id='lastName'
                        label='Last Name'
                        disabled={false}
                        errors={errors}
                        required
                        // icon={emailIcon}
                        onChange={(e:any) => setLastName(e.target.value)}
                    /> */}
                    <Input
                        id='email'
                        label='Email'
                        disabled={false}
                        errors={errors}
                        required
                        icon={emailIcon}
                        onChange={updateCredential}
                    />
                    <Input
                        id='password'
                        label='Password'
                        type='password'
                        disabled={false}
                        errors={errors}
                        required
                        icon={keyIcon}
                        onChange={updatePassword}
                    />
                    <Input
                        id='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        disabled={false}
                        errors={errors}
                        required
                        icon={keyIcon}
                        onChange={(e:any) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        label='Sign Up'
                        onClick={handleRegister}
                        light={false}
                        disabled={isDisabled()}
                    />
                    {/* divider */}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    {/* Sign up with Google */}
                    <div className="w-full flex justify-center items-center">
                        <button className="flex items-center justify-center bg-white text-[#737373] text-[14px]
                                            cursor-pointer py-4
                                            text-center rounded-md
                                            shadow w-full text-lg"
                                onClick={signInOauth}
                        >
                            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-[18px] h-[18px] mr-[10px]"/>
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ));

    stages.set(3, (
        <>
            <div className='pl-4 pt-4'>
                <Link href="/home">
                    <Image
                        alt="logo"
                        className="h-12 w-max absolute"
                        height="150"
                        width="150"
                        src="/images/logo.svg"
                    />
                </Link>
                {/* <Logo /> */}
                <div className='flex flex-col justify-center items-center h-screen w-5/12 m-auto'>
                    <div className='flex flex-col w-full p-4'>
                        <h3 className='text-purple-450 mb-8 hover:underline cursor-pointer' onClick={() => setStage(stage - 1)}>← Go back</h3>
                        <h1 className='font-bold text-2xl mb-2'>One more thing...</h1>
                        <div className='flex justify-between'>
                            <h3>Let's invite the rest of the team!</h3>
                            {/* <h3>Administrator?</h3> */}
                        </div>
                        {members.map((field, i) => (
                            <div className='flex justify-between items-center w-full gap-4 py-4'>
                                <div
                                    className='w-full'
                                    onChange={(e:any) => {members[i][0] = e.target.value}}
                                >
                                    <Input id='addMember' errors={errors} type="text" label='Team member email' icon={emailIcon} disabled={false} />
                                </div>
                                <div className='w-full' onChange={(e:any) => {members[i][1] = e.target.value}}>
                                    <Input id="inviteeFirstName" errors={errors} type="text" label='First Name' disabled={false} />
                                </div>
                                <div className='w-full' onChange={(e:any) => members[i][2] = e.target.value}>
                                    <Input id="inviteeLastName" errors={errors} type="text" label='Last Name' disabled={false} />
                                </div>
                            </div>
                        ))}
                        <h3 className='text-purple-450 hover:underline cursor-pointer px-1' onClick={() => setMembers([...members, ['', '', '']])}>+ Add a team member</h3>
                    </div>
                    <div className='flex flex-col w-full justify-center items-end'>
                        <div className='w-48 p-4'>
                            <Button label='Send Invites' onClick={() => sendInvites(members)} light={false} disabled={false} />
                        </div>
                        <p className='text-purple-450 cursor-pointer hover:underline px-5' onClick={() => setStage(stage + 1)}>Skip for now</p>
                    </div>
                </div>
            </div>
        </>
    ));

    return (
        <ClientOnly>
            {/* {stages.get(stage)} */}
            {stages.get(1)}
        </ClientOnly>
    );
}

export default Register;
