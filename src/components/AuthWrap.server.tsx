import { createServerClient } from '@/utils/supabase-server';

export async function getServerSession() {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getSession();
  return data?.session;
}
