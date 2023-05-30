"use client"

interface ButtonProps {
    label: string;
    onClick: any;
    light: boolean;
}

export default function Button ({
    label,
    onClick,
    light,
}: ButtonProps) {
    return (
        // create a button component that can be used throughout the app
        <div
            className={`
                flex transition w-full
                px-6 py-4 items-center
                overflow-hidden justify-center
                rounded-lg font-normal
                text-lg
                cursor-pointer border-2
                ${light ? "bg-white" : "bg-purple-450"}
                ${light ? "text-purple-450" : "text-white"}
                ${light ? "border-purple-450" : "border-white"}
                ${light ? "hover:bg-gray-50" : "hover:bg-purple-600"}
            `}
            onClick={onClick}
        >
            {label}
        </div>
    )
}
