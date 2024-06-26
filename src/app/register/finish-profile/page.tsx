'use client'

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from '@supabase/supabase-js';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/components/Input';
import CoverImageUpload from '@/components/CoverImageUpload';
import ClientOnly from '@/components/ClientOnly';

export default function finishProfilePage() {
    const { supabase, session } = useSupabase();
    const [errors, setErrors] = useState<string[]>([]);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [avatar_url, setAvatarURL] = useState<string>('');
    const [company_banner, setCompanyBanner] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const stages = new Map();
    console.log("session", session?.user);

    useEffect(() => {
        console.log({firstName}, {lastName}, {companyName}, {avatar_url})
        console.log(session?.user.id)
    }, [firstName, lastName, companyName, avatar_url])

    useEffect(() => {
        const fetchCompanyName = async () => {
            const { data, error } = await supabase.from('companies').select('company_name').eq('id', session?.user.user_metadata.company_id)
            if (data && data.hasOwnProperty(0))
                console.log(data[0].company_name);
            if (!error)
                setCompanyName(data![0].company_name);
        }
        const fetchUserName = async () => {
            const { data, error } = await supabase.from('profiles').select('first_name, last_name').eq('id', session?.user.id);
            if (!error) {
                setFirstName(data![0].first_name);
                setLastName(data[0].last_name);
            }
        }
        fetchCompanyName();
        fetchUserName();
    }, []);

    async function uploadAvatar(e: any) {
        const avatarFile = e.target.files[0];
        const { data, error } = await supabase.storage.from('avatars').upload(`${session?.user?.id}` + '/' + avatarFile.name, avatarFile);

        const avatarUrl = await getAvatarAfterUpload(avatarFile);
        setAvatarURL(avatarUrl.publicUrl);

        if (error) {
            console.log({error});
            setErrors(prev => [...prev, error.message]);
        } else {
            console.log(data);
        }
    }

    async function getAvatarAfterUpload(file: any) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(`${session?.user?.id}/${file.name}`);

        console.log(data)

        return data;
    }


    async function updateProfile() {
        await createCompany();
        const company_obj = await supabase.from('companies').select('id').eq('company_name', companyName);
        const company_id = company_obj.data ? company_obj.data[0].id : 0;
        console.log(company_id);
        // update the user metadata in the supabase auth.users table
        await supabase.auth.updateUser(
            {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    company_id,
                    avatar_url,
                    is_admin: true,
                }
            }
        )

        // update the user data in the supabase public.profiles table
        const { error } = await supabase.from('profiles').update({
            first_name: firstName,
            last_name: lastName,
            company_id,
            avatar_url,
            is_admin: true,
        }).eq('id', session?.user?.id);

        if (error) {
            console.log(error);
            setErrors(prev => [...prev, error.message]);
        } else {
            location.href = "/register/invite"
        }
    }

    async function updatePassword() {
        const { error } = await supabase.auth.updateUser({
            password,
        })
        if (error) {
            console.log(error);
            setErrors(prev => [...prev, error.message]);
        } else {
            location.href = "/register/create-profile"
        }
    };

    async function createCompany() {
        const { data, error } = await supabase.from('companies').insert({
            company_name: companyName,
            company_logo: "",
            company_banner: "",
        });
    }

    return (
        // <ClientOnly>
        //     <div className='pt-4 pl-4'>
        //         <div className='flex flex-col justify-center items-center h-screen w-5/12 m-auto'>
        //             <div className='w-full h-48 mb-12'>
        //                 <div>
        //                     <input
        //                         type={'file'}
        //                         accept='image/jpeg,image/png'
        //                         onChange={(e:any) => uploadAvatar(e)}
        //                         ref={inputRef}
        //                     />
        //                 </div>
        //             </div>
        //             <div className='flex w-full justify-start'>
        //                 <h1 className='font-bold text-3xl p-4'>Tell us about yourself!</h1>
        //             </div>
        //             {/* <div className='grid grid-rows-2 grid-flow-col gap-4 w-full'> */}
        //             <div className='flex flex-col w-full gap-4'>
        //                 <Input
        //                     id='firstName'
        //                     label='First Name'
        //                     disabled={false}
        //                     errors={errors}
        //                     required
        //                     onChange={(e:FormEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)}
        //                     initialValue={firstName}
        //                 />
        //                 <Input
        //                     id='lastName'
        //                     label='Last Name'
        //                     disabled={false}
        //                     errors={errors}
        //                     required
        //                     onChange={(e:FormEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
        //                     initialValue={lastName}
        //                 />
        //                 <Input
        //                     id='companyName'
        //                     label={"Company Name"}
        //                     disabled={false}
        //                     errors={errors}
        //                     required
        //                     onChange={(e:FormEvent<HTMLInputElement>) => setCompanyName(e.currentTarget.value)}
        //                     initialValue={companyName}
        //                 />
        //             </div>
        //             <div className="flex w-full justify-end">
        //                 <div className='w-48 mt-5'>
        //                     <Button
        //                         label='Next →'
        //                         onClick={updateProfile}
        //                         // label="Register"
        //                         // onClick={handleRegister}
        //                         light={false}
        //                         disabled={false}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </ClientOnly>
        <ClientOnly>
            <div className='pt-4 pl-4'>
                <div className='flex flex-col justify-center h-screen w-5/12 m-auto'>
                    <h1 className="font-bold text-3xl pb-4">You've been invited to the team!</h1>
                    <h3 className="text-lg pb-4">{session?.user.email}</h3>
                    <div className='flex flex-col gap-4'>
                        <Input
                            id='password'
                            label="Password"
                            onChange={(e:FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                            errors={errors}
                            type='password'
                        />
                        <Input
                            id='confirmPassword'
                            label="Confirm Password"
                            onChange={(e:FormEvent<HTMLInputElement>) => setConfirmPassword(e.currentTarget.value)}
                            errors={errors}
                            type='password'
                        />
                        <Button
                            label='Next'
                            onClick={updatePassword}
                            light={false}
                            disabled={password !== confirmPassword}
                        />
                    </div>
                </div>
            </div>
        </ClientOnly>
    )
}
