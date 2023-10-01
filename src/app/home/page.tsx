'use client';

import './home.css';
import NavigationButton from '@/components/sidebar/NavigationButton';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
interface HomeProps {
  children: React.ReactNode;
}
const Home = ({ children }: HomeProps) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log();

  return <div> {children}</div>;
};

export default Home;
