"use client"

import { FC, ReactNode, useState, useEffect } from 'react';
import Button from '../Button';
import Logo from '../Logo';

export default function AuthLeftPanel() {
    const onClick = () => console.log("clicked");
    useEffect(() => console.log("mounted"), [])
    return (
        <div className="fixed flex flex-col w-24 hover:w-96 md:w-96 z-10 h-full border-r-[1px] border-[#F1F3F4] transition-all duration-500">
            <Logo />
            <div>"Lorem Ipsum"</div>
            <Button label="Sign In" onClick={onClick} />
        </div>
    )
}
