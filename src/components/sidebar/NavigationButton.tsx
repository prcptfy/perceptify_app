"use client"


import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";

interface NavigationButtonProps {
    label: string;
    subtext: string;
    onClick: (e: any) => void;
    icon?: any;
    small?: boolean;
}

const NavigationButton: FC<NavigationButtonProps> = ({
    label,
    subtext,
    onClick,
    icon,
    small,
}) => {
    const router = useRouter();
    return (
      <div
        className={`
          relative
          transition
          hover:bg-[#F5F5F5]
          bg-white
          w-full
          ${small ? "px-1" : "px-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "text-sm" : "text-md"}
          cursor-pointer
          min-h-fit
          min-w-fit
          py-4
        `}
        onClick={onClick}
      >
        <div>{icon}</div>
        <div>
          <div className="font-semibold">{label}</div>
          <div
            className="
              font-light
              text-sm
            "
          >{subtext}</div>
        </div>
      </div>
    )
}

export default NavigationButton;
