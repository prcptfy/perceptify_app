'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SmallLogo() {
  return (
    <Link href="/home">
      <Image
        alt="logo"
        className='w-auto'
        height="250"
        width="250"
        src="/images/small_logo.svg"
      />
    </Link>
  );
}
