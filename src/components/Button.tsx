"use client"


import { FC, MouseEvent } from "react";

interface NavigationButtonProps {
    label: string;
    onClick: (e:MouseEvent<HTMLButtonElement>) => void;
    icon: any;
    small?: boolean;
}

const NavigationButton: FC<NavigationButtonProps> = ({
    label,
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
          
        `}
      >

      </div>
    )
}
