"use client"

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    errors?: any;
    icon?: any;
    onChange?: any;
}

export default function Input({
    id,
    label,
    type = "text",
    disabled,
    required,
    errors,
    icon,
    onChange
}: InputProps) {
    return (
            <div className="w-full relative">
                <input
                    id={id}
                    disabled={disabled}
                    placeholder=" "
                    type={type}
                    className={`
                        peer
                        w-full
                        p-3
                        pt-7
                        font-light
                        bg-[#f5f5f5]
                        border-2
                        rounded-md
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-[#1d1d1f]'}
                    `}
                    onChange={onChange}
                />
                <label
                    className={`
                        absolute
                        text-md
                        duration-150
                        transform
                        -translate-y-3
                        top-5
                        z-10
                        origin-[0]
                        ${icon ? 'left-12' : "left-4"}
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:scale-75
                        peer-focus:-translate-y-4
                        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                    `}
                >{label}</label>
                <div
                    className="
                        absolute
                        text-md
                        duration-150
                        transform
                        px-1
                        -translate-y-3
                        top-5
                        z-10
                        origin-[0]
                        left-2
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:scale-75
                        peer-focus:-translate-y-4
                    "
                >
                    {icon}
                </div>
            </div>
    )
}
