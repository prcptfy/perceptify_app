"use client"


import { FC, MouseEvent } from "react";

interface NavigationButtonProps {
    label: string;
    subtext: string;
    onClick: (e:MouseEvent<HTMLButtonElement>) => void;
    icon: any;
    small?: boolean;
}

const NavigationButton: FC<NavigationButtonProps> = ({
    label,
    subtext,
    onClick,
    icon,
    small,
}) => {
    return (
      <div
        className={`
          relative
          transition
          hover:bg-[#D9D9D9]
          bg-white
          w-full
          ${small ? "px-1" : "px-3"}
          ${small ? "font-light" : "font-semibold"}
          ${small ? "text-sm" : "text-md"}
        `}
      >
        <div>{icon}</div>
        <div>
          <div>{label}</div>
          <div>{subtext}</div>
        </div>
      </div>
    )
}

export default NavigationButton;
