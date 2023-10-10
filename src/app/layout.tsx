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

export const revalidate = 0;
type SessionType = {
  access_token: string;
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Perceptify',
  description: 'Simplify your data, amplify your insights.',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          {session && (
            <SupabaseListener
              serverAccessToken={(session as SessionType)?.access_token}
            />
          )}
          <main className="flex ">
            <div
              className={`${
                session ? 'mr-72' : ''
              } w-74 border-r border-gray-200 bg-white`}
            >
              {session && <Sidebar />}
            </div>
            <div className="w-auto flex-grow overflow-auto bg-white">
              {children}
            </div>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
