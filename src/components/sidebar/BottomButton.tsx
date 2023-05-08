"use client"

import { FC, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface BottomButtonProps {
    icon?: any;
    label: string;
    small?: boolean;
    red?: boolean;
    onClick?: any;
}

const BottomButton: FC<BottomButtonProps> = ({
    icon,
    label,
    small,
    red,
    onClick,
}) => {
    const router = useRouter();

    return (
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
    )
}

export default BottomButton;
