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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <main className="flex min-h-screen main">
            <div className='sidebar'>
              <Sidebar/>
            </div>
            <div className="">
              <div className=''>
                {children}
              </div>
            </div>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
} else {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <main className="flex min-h-screen main">
            <div className='sidebar'>
              {/* <Sidebar/> */}
            </div>
            <div className="">
              <div className=''>
                {children}
              </div>
            </div>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}

}
