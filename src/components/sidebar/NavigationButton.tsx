'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavigationButtonProps {
  label: string;
  subtext: string;
  link: string;
  icon?: any;
  small?: boolean;
  selected: boolean;
}

export default function NavigationButton({
  label,
  subtext,
  link,
  icon,
  small,
  selected,
}: NavigationButtonProps) {
  return (
    <Link href={link}>
      <div
        className={`
            flex transition hover:bg-[#F5F5F5] w-full
            ${selected ? 'bg-[#F5F5F5]' : 'bg-white'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'text-sm' : 'text-md'}
            py-4 px-[19px] items-center gap-6
            overflow-hidden justify-start
          `}
      >
        <div className="w-7 h-7 grid place-items-center">{icon}</div>
        <div className="whitespace-nowrap">
          <div className="font-semibold">{label}</div>
          <div className="font-light text-sm text-[#5E6366]">{subtext}</div>
        </div>
      </div>
    </Link>
  );
}
