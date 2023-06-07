"use client"

export default function Dropdown() {
    const options = [
        "Member",
    ]
    return (
        <div className="w-48">
            <select className="w-full p-[1.405rem] rounded-lg border-2 border-neutral-300 focus:border-[#1D1D1F] bg-[#F5F5F5] text-sm">
                {options.map(option => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
