import 'server-only';

import SupabaseProvider from '@/components/supabase-provider';
import SupabaseListener from '@/components/supabase-listener';
import { createServerClient } from '@/utils/supabase-server';
// import Topbar from './Topbar';
// import styles from './rootLayout.module.css';
import './globals.css';
import ClientOnly from '@/components/ClientOnly';
import Sidebar from '@/components/sidebar/Sidebar';
// import { NextUIProvider } from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Header from '@/components/header';
import { DM_Sans } from 'next/font/google';
const DMSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const revalidate = 0;
type SessionType = {
  access_token: string;
};

interface RootLayoutProps {
  children: React.ReactNode;
}
const userData = [
  {
    name: 'Bob Marley',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    name: 'Bob Ross',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    name: 'Suyogya Poudel',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
  },
  {
    name: 'Jane Doe',
    // avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    avatar: '',
  },
];
export const metadata = {
  title: 'Perceptify',
  description: 'Simplify your data, amplify your insights.',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = headers().get('x-invoke-path') || '';
  const blacklist = ['/login', '/register'];

  if (!session && !blacklist.includes(pathname)) redirect('/login');
  console.log();

  return (
    <html lang="en">
      <body className={`${DMSans.className} flex h-screen overflow-hidden`}>
        <SupabaseProvider session={session}>
          {session && (
            <SupabaseListener
              serverAccessToken={(session as SessionType)?.access_token}
            />
          )}
          <div className="w-74 border-r border-gray-200 bg-white">
            {session && <Sidebar />}
          </div>
          <main className="flex flex-grow overflow-y-auto">
            <div className="relative w-auto flex-grow bg-white">
              <div className='mb-12'>
              <Header userData={userData} /></div>
              {children}
            </div>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}