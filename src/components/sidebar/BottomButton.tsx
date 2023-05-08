"use client"

import { FC } from 'react';
import Link from 'next/link';

interface BottomButtonProps {
    icon?: any;
    label: string;
    small?: boolean;
    red?: boolean;
    link?: any;
    onClick?: any;
}

const BottomButton: FC<BottomButtonProps> = ({
    icon,
    label,
    small,
    red,
    link,
    onClick,
}) => {
    return (
        <Link href={link}>
            <div
                onClick={onClick}
                className="
                    flex transition hover:bg-[#F5F5F5] w-full
                    py-2 px-[23px] items-center gap-8
                    overflow-hidden justify-start
                "
            >
                <div className='flex align-center'>{icon}</div>
                {!small &&
                <div
                className={`
                    ${red ? "text-[#DB4437]" : "text-black"}
                    whitespace-nowrap
                `}
                >{label}</div>}
            </div>
        </Link>
    )
}

export default BottomButton;
