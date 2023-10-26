"use client"

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/supabase-provider";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function InviteNewUsers() {
    const { supabase } = useSupabase();
    const [members, setMembers] = useState<string[][]>([['']]);
    const [errors, setErrors] = useState('');
    const [session, setSession] = useState({ user: { id: '', user_metadata: { company_id: 0 } }});
    const [company_id, setCompanyId] = useState(0)

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session }} = await supabase.auth.getSession();
            console.log('session', session);
            setCompanyId(session?.user.user_metadata.company_id)
        }
        fetchSession().catch(console.error);
    }, []);


    const emailIcon = <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" fill="none">
        <path fill="#8915E4" d="M24.777 4.688H3.348a1.786 1.786 0 0 0-1.785 1.785V20.76a1.786 1.786 0 0 0 1.785 1.786h21.429a1.786 1.786 0 0 0 1.785-1.786V6.473a1.786 1.786 0 0 0-1.785-1.785Zm-1.965 1.785-8.75 6.054-8.75-6.054h17.5ZM3.349 20.76V7.286l10.206 7.062a.893.893 0 0 0 1.017 0l10.206-7.062v13.473H3.348Z"/>
    </svg>

    async function sendInvites(addedMembers:string[][]) {
        for (let i = 0; i < addedMembers.length; i++) {
            const member = addedMembers[i];
            const [email] = member;
            await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo:
                        process.env.NODE_ENV === "development" ?
                            'http://localhost:3000/register/create-profile' :
                            'https://perceptify-app.vercel.app/register/create-profile',
                    data: {
                        is_admin: false,
                        company_id,
                    }
                }
            });
        }
    }



    return (
        <ClientOnly>
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
                        {/* <h3 className='text-purple-450 mb-8 hover:underline cursor-pointer' onClick={() => setStage(stage - 1)}>← Go back</h3> */}
                        <h1 className='font-bold text-2xl mb-2'>Let's invite the rest of the team!</h1>
                        {/* <div className='flex justify-between'> */}
                            {/* <h3>Let's invite the rest of the team!</h3> */}
                            {/* <h3>Administrator?</h3> */}
                        {/* </div> */}
                        {members.map((field, i) => (
                            <div className='flex justify-between items-center w-full gap-4 py-4'>
                                <div
                                    className='w-full'
                                    onChange={(e:any) => {members[i][0] = e.target.value}}
                                >
                                    <Input id='addMember' errors={errors} type="text" label='Team member email' icon={emailIcon} disabled={false} />
                                </div>
                            </div>
                        ))}
                        <h3 className='text-purple-450 hover:underline cursor-pointer px-1' onClick={() => setMembers([...members, ['', '', '']])}>+ Add a team member</h3>
                    </div>
                    <div className='flex flex-col w-full justify-center items-end'>
                        <div className='w-48 p-4'>
                            <Button label='Send Invites' onClick={() => sendInvites(members)} light={false} disabled={false} />
                        </div>
                        <p className='text-purple-450 cursor-pointer hover:underline px-5' onClick={() => location.href = "/home"}>Skip for now</p>
                    </div>
                </div>
            </div>
        </ClientOnly>
    )
};
