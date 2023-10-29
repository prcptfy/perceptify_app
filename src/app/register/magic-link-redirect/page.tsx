'use client'

import { useSupabase } from "@/components/supabase-provider";

const magicLinkRedirect = async () => {
    const { session, supabase } = useSupabase();
    console.log(session);
    if (!session) return null;
    location.href='/register/create-profile';
}

export default magicLinkRedirect;
