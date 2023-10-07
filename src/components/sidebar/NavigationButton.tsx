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
            flex w-full rounded-lg transition hover:bg-[#F5F5F5]
            ${selected ? 'bg-[#F5F5F5]' : 'bg-white'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'text-sm' : 'text-md'}
            items-center justify-start gap-6 overflow-hidden
            py-4 px-[19px]
          `}
      >
        <div className="align-center flex">{icon}</div>
        <div className="whitespace-nowrap">
          <div className="font-semibold">{label}</div>
          <div className="text-sm font-light text-[#5E6366]">{subtext}</div>
        </div>
      </div>
    </Link>
  );
}
