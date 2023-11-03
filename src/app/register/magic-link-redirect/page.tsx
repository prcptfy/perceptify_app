'use client'

import { useSupabase } from "@/components/supabase-provider";
import { useEffect } from "react";

const magicLinkRedirect = async () => {
    const { session, supabase } = useSupabase();
    useEffect(() => {
        supabase.auth.getSession()
            .then(({ data: session, error }) => {
                if (error) {
                    console.log(error);
                    return;
                }
                if (session) {
                    console.log("SIGNED IN\n", session);
                    location.href='/register/finish-profile';
                }
            });
    }, []);
    console.log("SIGNED IN\n", session?.user.id);
    if (!session) {
        return <h1>Not signed in</h1>
    };
}

export default magicLinkRedirect;
