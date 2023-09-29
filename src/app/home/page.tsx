"use client"

import './home.css'
import NavigationButton from '@/components/sidebar/NavigationButton';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Home = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log()

    return (
    <div>

    </div>
    )
}

export default Home;
