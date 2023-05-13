import 'server-only'

import SupabaseProvider from '@/components/supabase-provider';
import SupabaseListener from '@/components/supabase-listener';
import { createServerClient } from '@/utils/supabase-server';
import Topbar from './Topbar';
import styles from './rootLayout.module.css';
import './globals.css';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <main className="flex min-h-screen flex-col">
            <Topbar />
            <div
              className={`relative min-h-screen p-12 ${styles.dotBackground}`}
            >
              {children}
            </div>
          </main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
