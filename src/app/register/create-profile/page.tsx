'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ClientOnly from '@/components/ClientOnly';
import AvatarUpload from './avatarUpload';

export default function createProfilePage() {
  const { supabase, session } = useSupabase();
  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [avatar_url, setAvatarURL] = useState<string>('');
  const [company_banner, setCompanyBanner] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('session', session?.user);

  useEffect(() => {
    console.log({ firstName }, { lastName }, { companyName }, { avatar_url });
    console.log(session?.user.id);
  }, [firstName, lastName, companyName, avatar_url]);

  useEffect(() => {
    const fetchCompanyName = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('company_name')
        .eq('id', session?.user.user_metadata.company_id);
      if (data && data.hasOwnProperty(0)) console.log(data[0].company_name);
      if (!error) setCompanyName(data![0].company_name);
    };
    const fetchUserName = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', session?.user.id);
      if (!error) {
        setFirstName(data![0].first_name);
        setLastName(data[0].last_name);
      }
    };
    fetchCompanyName();
    fetchUserName();
  }, []);

  async function uploadAvatar(e: any) {
    const avatarFile = e.target.files[0];
    console.log(avatarFile);
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${session?.user?.id}` + '/' + avatarFile.name, avatarFile);

    const avatarUrl = await getAvatarAfterUpload(avatarFile);
    setAvatarURL(avatarUrl.publicUrl);

    if (error) {
      console.log({ error });
      setErrors((prev) => [...prev, error.message]);
    } else {
      console.log(data);
    }
  }

  async function uploadFile(e: React.DragEvent<HTMLInputElement>) {
    const avatarFile = e.dataTransfer.files[0];
    console.log(avatarFile);
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${session?.user?.id}/${avatarFile.name}`, avatarFile);

    const avatarUrl = await getAvatarAfterUpload(avatarFile);
    setAvatarURL(avatarUrl.publicUrl);

    if (error) {
      console.log({ error });
      setErrors(prev => [...prev, error.message]);
    } else {
      console.log(data)
    }
  }

  async function getAvatarAfterUpload(file: any) {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${session?.user?.id}/${file.name}`);

    console.log(data);

    return data;
  }

  async function updateProfile() {
    await createCompany();
    const company_obj = await supabase
      .from('companies')
      .select('id')
      .eq('company_name', companyName);
    const company_id = company_obj.data ? company_obj.data[0].id : 0;
    console.log(company_id);
    // update the user metadata in the supabase auth.users table
    await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        company_id,
        avatar_url,
        is_admin: true,
      },
    });

    // update the user data in the supabase public.profiles table
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        company_id,
        avatar_url,
        is_admin: true,
      })
      .eq('id', session?.user?.id);

    if (error) {
      console.log(error);
      setErrors((prev) => [...prev, error.message]);
    } else {
      location.href = '/register/invite';
    }
  }

  async function createCompany() {
    const { data, error } = await supabase.from('companies').insert({
      company_name: companyName,
      company_logo: '',
      company_banner: '',
    });
  }

  return (
    <ClientOnly>
      <div className="pt-4 pl-4">
        <div className="m-auto flex h-screen w-5/12 flex-col items-center justify-center">
          <div className="mb-12 h-48 w-full">
            {/* <CoverImageUpload handleUpload="" /> */}
            {/* Profile Picture Upload */}

            {/* {avatar_url.length < 1 && <div
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
                        {avatar_url.length > 0 &&
                            <div
                                className='
                                    flex items-center justify-center w-24 h-24 ml-16 -mt-12
                                    rounded-full
                                '
                            >
                                <Image src={avatar_url} alt='profile-picture' width={24} height={24} />
                            </div>
                        } */}

            {/* Avatar Upload Input */}
            <div>
              <label>Upload your profile picture here</label>
              <input
                type={'file'}
                accept="image/jpeg,image/png"
                onChange={(e: any) => uploadFile(e)}
                ref={inputRef}
                className="hidden"
              />
              <div
                className={`
                                    z-50 ml-16 -mt-12 flex h-40 w-40 cursor-pointer
                                    items-center justify-center rounded-full border-2 border-dashed
                                    border-slate-300 bg-[#F5F5F5] hover:border-slate-500
                                `}
                id="dropzone"
                onClick={() => inputRef.current?.click()}
              ></div>
            </div>
            <AvatarUpload handleFileDrop={uploadFile} handleFileClick={uploadAvatar} />
          </div>
          <div className="flex w-full justify-start">
            <h1 className="p-4 text-3xl font-bold">Tell us about yourself!</h1>
          </div>
          {/* <div className='grid grid-rows-2 grid-flow-col gap-4 w-full'> */}
          <div className="flex w-full flex-col gap-4">
            <Input
              id="firstName"
              label="First Name"
              disabled={false}
              errors={errors}
              required
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setFirstName(e.currentTarget.value)
              }
              initialValue={firstName}
            />
            <Input
              id="lastName"
              label="Last Name"
              disabled={false}
              errors={errors}
              required
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setLastName(e.currentTarget.value)
              }
              initialValue={lastName}
            />
            <Input
              id="companyName"
              label={'Company Name'}
              disabled={false}
              errors={errors}
              required
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setCompanyName(e.currentTarget.value)
              }
              initialValue={companyName}
            />
          </div>
          <div className="flex w-full justify-end">
            <div className="mt-5 w-48">
              <Button
                label="Next →"
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
    </ClientOnly>
  );
}
