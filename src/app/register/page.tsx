'use client'

import { useState, useEffect, use, MouseEventHandler } from 'react';
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

    const updateCredential = (e:any) => {
        e.preventDefault();
        setCredential(e.target.value);
    }

    const updatePassword = (e:any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    // const sendInvites = async (addedMembers:string[]) => {
    //     for (const member of addedMembers) {
    //         const {data, error} = await supabase.auth.signInWithOtp({
    //             email: member,
    //             options: {
    //                 emailRedirectTo: "http://localhost:3000/home"
    //             }
    //         });
    //     }
    // }

    async function sendInvites(addedMembers:string[][]) {
        for (let i = 0; i < addedMembers.length; i++) {
            const member = addedMembers[i];
            const [email, first_name, last_name] = member;
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: "http://localhost:3000/home",
                    data: {
                        first_name,
                        last_name,
                    }
                }
            })
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
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        });
        if (error) {
            console.log('error', error);
            setErrors(JSON.stringify(error));
        } else {
            router.push("/home");
        }
        console.log(data)
    }

    const signInOauth = async (e:any) => {
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "http://localhost:3000/home" } });
        if (error) {
            console.log("error", error);
            setErrors(JSON.stringify(error));
        } else {
            router.push("/dashboard");
        }
        console.log(data)
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
                        label='Next →'
                        // onClick={() => setStage(stage + 1)}
                        onClick={() => setStage(stage + 1)}
                        light={false}
                        disabled={confirmPassword === password}
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
                                            shadow"
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

    stages.set(2, (
        <>
            <div className='pt-4 pl-4'>
                <Link href="/home">
                    <Image
                        alt="logo"
                        className="h-16 w-max absolute"
                        height="250"
                        width="250"
                        src="/images/logo.svg"
                    />
                </Link>
                <div className='flex flex-col justify-center items-center h-screen w-5/12 m-auto'>
                    <div className='w-full h-48 mb-12'>
                        <CoverImageUpload handleUpload="" />
                        <ProfileImageUpload />
                    </div>
                    <div className='flex w-full justify-start'>
                        <h1 className='font-bold text-3xl p-4'>Tell us about yourself!</h1>
                    </div>
                    <div className='grid grid-rows-2 grid-flow-col gap-4 w-full'>
                        <Input
                            id='firstName'
                            label='First Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:any) => setFirstName(e.target.value)}
                        />
                        <Input
                            id='lastName'
                            label='Last Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:any) => setLastName(e.target.value)}
                        />
                        <Input
                            id='companyName'
                            label='Company Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:any) => setCompanyName(e.target.value)}
                        />
                        <Input
                            id='role'
                            label='Your Position'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:any) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <div className='w-48 mt-5'>
                            <Button
                                label='Next →'
                                onClick={() => stage < 3 && setStage(stage + 1)}
                                // label="Register"
                                // onClick={handleRegister}
                                light={false}
                                disabled={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
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
        {stages.get(3)}
        </ClientOnly>
    );
}

export default Register;
