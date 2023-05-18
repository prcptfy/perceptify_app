'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/home">
      <Image
        alt="logo"
        className="h-24 w-max"
        height="250"
        width="250"
        src="/images/logo.svg"
      />
    </Link>
  );
}
