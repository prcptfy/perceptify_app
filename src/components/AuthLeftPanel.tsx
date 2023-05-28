"use client"

import { FC, ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Button from './Button';
import Logo from './Logo';

interface AuthLeftPanelProps {
    title?: string;
    subtitle?: string;
}

export default function AuthLeftPanel({
    title,
    subtitle,
}: AuthLeftPanelProps) {
    const pathname = usePathname();
    const onClick = () => console.log("clicked");
    const label = pathname.startsWith("/login") ? "Create an Account" : "Log In";
    useEffect(() => console.log("mounted"), [])
    return (
        <div className="flex flex-col w-0 md:w-1/4 z-10 h-screen border-r-[1px] border-[#F1F3F4] transition-all duration-500
                        px-12 bg-[#F5F5F5]
                        "
        >
            <Logo />
            <Image className='mt-12 mb-10' src="/images/AuthLeftPanelFormIcons.png" width={500} height={500} alt="form-graphic" />
            <div className='mb-5 text-xl font-semibold'>{title}</div>
            <div className='mb-10'>{subtitle}</div>
            <Button label={label} onClick={onClick} light />
        </div>
    )
}
