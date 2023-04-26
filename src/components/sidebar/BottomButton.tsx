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
    onClick
}) => {
    const router = useRouter();

    return (
        <div
            onClick={onClick}
            className="
            py-2
            cursor-pointer
            hover:font-semibold
            "
        >
            <div>{icon}</div>
            {!small &&
            <div
            className={`
                ${red ? "text-[#DB4437]" : "text-black"}
            `}
            >{label}</div>}
        </div>
    )
}

export default BottomButton;
