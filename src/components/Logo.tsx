'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/home">
      <Image
        alt="logo"
        className="h-auto w-auto"
        height="250"
        width="250"
        src="/images/logo.svg"
      />
    </Link>
  );
}
