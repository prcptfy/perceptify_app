"use client"

import { FC, ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from './Button';
import Logo from './Logo';

interface AuthLeftPanelProps {
    text?: string;
}

export default function AuthLeftPanel({
    text,
}: AuthLeftPanelProps) {
    const pathname = usePathname();
    console.log(pathname)
    const onClick = () => console.log("clicked");
    const label = pathname.startsWith("/login") ? "Create an Account" : "Log In";
    useEffect(() => console.log("mounted"), [])
    return (
        <div className="flex flex-col w-0 md:w-96 z-10 h-full border-r-[1px] border-[#F1F3F4] transition-all duration-500">
            <Logo />
            <div>{text}</div>
            <Button label={label} onClick={onClick} light />
        </div>
    )
}
