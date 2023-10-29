'use client';

import { useSupabase } from '@/components/supabase-provider';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLeftPanel from '@/components/AuthLeftPanel';
// import Input from '@/components/Input';
import Link from 'next/link';
import { Spinner, Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from '../../components/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../components/icons/EyeSlashFilledIcon';


const Login = () => {
  const router = useRouter();
  const { supabase, session } = useSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const keyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      viewBox="0 0 27 27"
      fill="none"
    >
      <path
        stroke="#8915E4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.226 16.237A7.892 7.892 0 0 0 23.69 3.311a7.89 7.89 0 0 0-12.926 8.463m4.434 4.493L5.463 26l-4.091-.372L1 21.537l9.733-9.734m8.492-3.993v-.036"
      />
    </svg>
  );

  const emailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      viewBox="0 0 27 27"
      fill="none"
    >
      <path
        fill="#8915E4"
        d="M24.777 4.688H3.348a1.786 1.786 0 0 0-1.785 1.785V20.76a1.786 1.786 0 0 0 1.785 1.786h21.429a1.786 1.786 0 0 0 1.785-1.786V6.473a1.786 1.786 0 0 0-1.785-1.785Zm-1.965 1.785-8.75 6.054-8.75-6.054h17.5ZM3.349 20.76V7.286l10.206 7.062a.893.893 0 0 0 1.017 0l10.206-7.062v13.473H3.348Z"
      />
    </svg>
  );

  async function handleEmailLogin(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // console.log(email, password)
    error ? console.log('error', error) : location.href = '/home';
  }

  async function handleOTPLogin(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.NODE_ENV === "development" ? 'http://localhost:3000/home' : 'https://perceptify-app.vercel.app/home',
      },
    });
    error ? console.log('error', error) : location.href = '/home';
  }

  async function handleGoogleLogin(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/home' : 'https://perceptify-app.vercel.app/home',
      },
    });
    if (error) {
      console.log(error);
    } else {
      window.location.href = '/home';
    }
  }

  async function demoLogin(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: 'demo_user@email.com',
      password: 'demopassword',
    });

    if (error) {
      console.log(error);
    } else {
      window.location.href = '/home';
    }
  }

  // useEffect(() => console.log(`session: ${session}`), [session]);
  if (session) {
    router.push('/home/overview');
    return <div></div>;
  } else if (!session)
    return (
      <div className="flex">
        <AuthLeftPanel
          title="Learn What the people think."
          subtitle="Powerful relevance and sentiment analytics for brand performance. Data-driven, actionable insights and recommendations for marketing strategies. Streamlined integrations and customization. A beautifully refreshing and seamless take on marketing infrastructure, built for you. "
        />
        <div className="mt-6 flex w-full items-center justify-center">
          <form
            className="flex max-w-md flex-col gap-5"
            onSubmit={handleEmailLogin}
          >
            <div>
              <h1 className="mb-2 text-3xl font-bold">👋🏼 Welcome back!</h1>
              <p className="text-lg font-extralight">
                Get back to managing your business insights.
              </p>
            </div>
            {/* <Input
              id="email"
              label="Email"
              disabled={false}
              errors={errors}
              required
              icon={emailIcon}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              disabled={false}
              errors={errors}
              required
              icon={keyIcon}
              onChange={(e: any) => setPassword(e.target.value)}
    /> */}
            <Input
              type="email"
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="Email"
              required
              startContent={emailIcon}
            />
            <Input
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Password"
              required
              startContent={keyIcon}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
            />
            <Link
              href="/forgot-password"
              className="text-purple-450 hover:text-purple-500"
            >
              Forgot Password?
            </Link>
            <Button
              color="secondary"
              onClick={handleEmailLogin}
              disabled={!email || !password}
            >
              Log In With Password
            </Button>
            <Button
              color="secondary"
              onClick={handleOTPLogin}
              disabled={!email}
            >
              Log In With Magic Link
            </Button>
            <Button color="secondary" onClick={demoLogin} disabled={false}>
              Demo Perceptify
            </Button>
            {/* divider */}
            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="mx-4 flex-shrink text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className="flex w-full items-center justify-center">
              <button
                className="flex w-full cursor-pointer items-center justify-center
                                            rounded-md bg-white py-4 text-center text-[14px]
                                            text-lg text-[#737373]
                                            shadow"
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="mr-[10px] h-[18px] w-[18px]"
                />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
};

export default Login;
