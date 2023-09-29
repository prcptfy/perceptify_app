"use client"

interface ButtonProps {
    label: string;
    onClick: any;
    light: boolean;
    disabled: boolean;
}

export default function Button ({
    label,
    onClick,
    light,
    disabled,
}: ButtonProps) {
    return (
        // create a button component that can be used throughout the app
        <div
            className={`
                flex transition w-full
                px-6 py-4 items-center
                overflow-hidden justify-center
                rounded-lg font-normal
                text-lg border-2
                ${light ? "bg-white" : "bg-purple-450"}
                ${light ? "text-purple-450" : "text-white"}
                ${light ? "border-purple-450" : "border-white"}
                ${light ? "hover:bg-gray-50" : "hover:bg-purple-600"}
                ${disabled ? "cursor-default bg-gray-300 hover:bg-gray-300" : "cursor-pointer"}
            `}
            onClick={onClick}

        >
            {label}
        </div>
    )
}
