'use client'

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { Session } from '@supabase/supabase-js';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/components/Input';
import CoverImageUpload from '@/components/CoverImageUpload';
import { randomUUID } from 'crypto';

export default function createProfilePage() {
    const { supabase } = useSupabase();
    const [errors, setErrors] = useState<string[]>([]);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [avatar_url, setAvatarURL] = useState<string>('');
    const [company_banner, setCompanyBanner] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { session } = useSupabase();
    console.log(session?.user);

    useEffect(() => {
        console.log({firstName}, {lastName}, {companyName}, {avatar_url})
        console.log(session?.user.id)
    }, [firstName, lastName, companyName, avatar_url])

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
        const { data, error } = await supabase.from('profiles').update({
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
            location.href = "/invite"
        }
    }

    async function createCompany() {
        const { data, error } = await supabase.from('companies').insert({
            company_name: companyName,
            company_logo: "",
            company_banner: "",
        });
    }

    return (
        <>
            <div className='pt-4 pl-4'>
                {/* <Link href="/home">
                    <Image
                        alt="logo"
                        className="h-16 w-max absolute"
                        height="250"
                        width="250"
                        src="/images/logo.svg"
                    />
                </Link> */}
                <div className='flex flex-col justify-center items-center h-screen w-5/12 m-auto'>
                    <div className='w-full h-48 mb-12'>
                        {/* <CoverImageUpload handleUpload="" /> */}
                        {/* Profile Picture Upload */}
{/*
                        {avatar.length < 1 && <div
                            className={`
                                flex items-center justify-center w-24 h-24 ml-16 -mt-12
                                rounded-full bg-[#F5F5F5] border-slate-300 border-dashed border-2
                                cursor-pointer hover:border-slate-500 z-50
                            `}
                            id="dropzone"
                            onClick={() => inputRef.current?.click()}
                            >
                            <input
                                type="file"
                                accept='image/jpeg,image/png'
                                onChange={(e:any) => uploadAvatar(e)}
                                hidden
                                ref={inputRef}
                            />
                        </div>}
                        {avatar.length > 0 &&
                            <div
                                className='
                                    flex items-center justify-center w-24 h-24 ml-16 -mt-12
                                    rounded-full
                                '
                            >
                                <Image src={avatar} alt='profile-picture' width={24} height={24} />
                            </div>
                        } */}

                        {/* Avatar Upload Input */}
                        <div>
                            <input
                                type={'file'}
                                accept='image/jpeg,image/png'
                                onChange={(e:any) => uploadAvatar(e)}
                                ref={inputRef}
                            />
                        </div>
                    </div>
                    <div className='flex w-full justify-start'>
                        <h1 className='font-bold text-3xl p-4'>Tell us about yourself!</h1>
                    </div>
                    {/* <div className='grid grid-rows-2 grid-flow-col gap-4 w-full'> */}
                    <div className='flex flex-col w-full gap-4'>
                        <Input
                            id='firstName'
                            label='First Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:FormEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)}
                        />
                        <Input
                            id='lastName'
                            label='Last Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:FormEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
                        />
                        <Input
                            id='companyName'
                            label='Company Name'
                            disabled={false}
                            errors={errors}
                            required
                            onChange={(e:FormEvent<HTMLInputElement>) => setCompanyName(e.currentTarget.value)}
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <div className='w-48 mt-5'>
                            <Button
                                label='Next →'
                                onClick={updateProfile}
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
    )
}
