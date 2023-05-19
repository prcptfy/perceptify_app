"use client"

interface ButtonProps {
    label: string;
    onClick: any;
}

export default function Button ({
    label,
    onClick,
}: ButtonProps) {
    return (
        // create a button component that can be used throughout the app with a prop for the label
        <div
            className="
                flex transition min-w-fit-content w-40
                px-6 py-2 items-center
                overflow-hidden justify-center
                bg-purple-500 text-white
                rounded-md
                font-semibold
            "
            onClick={onClick}
        >
            {label}
        </div>
    )
}
