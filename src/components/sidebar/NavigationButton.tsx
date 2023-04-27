"use client"


import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";

interface NavigationButtonProps {
    label: string;
    subtext: string;
    onClick: (e: any) => void;
    icon?: any;
    small?: boolean;
    selected: boolean;
}

const NavigationButton: FC<NavigationButtonProps> = ({
    label,
    subtext,
    onClick,
    icon,
    small,
    selected
}) => {
    const router = useRouter();
    return (
      <div
        className={`
          flex
          flex-row
          relative
          transition
          hover:bg-[#F5F5F5]
          ${selected ? "bg-[#F5F5F5]" : "bg-white"}
          w-full
          ${small ? "font-light" : "font-semibold"}
          ${small ? "text-sm" : "text-md"}
          cursor-pointer
          min-h-fit
          min-w-fit
          py-4
        `}
        onClick={onClick}
      >
        <div
          className="flex justify-center self-center px-4 h-auto w-auto"
        >{icon}</div>
        <div>
          <div className="font-semibold">{label}</div>
          <div
            className="
              font-light
              text-sm
              text-[#5E6366]
            "
          >{subtext}</div>
        </div>
      </div>
    )
}

export default NavigationButton;
