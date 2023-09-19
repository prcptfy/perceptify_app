"use client"

import Sidebar from "@/components/sidebar/Sidebar";
import { useSupabase } from "@/components/supabase-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { supabase, session } = useSupabase();

    useEffect(() => console.log(session), [session])

    useEffect(() => {
        router.push("/home")
    }, []);

    if (!session?.user.user_metadata.first_name) {
        // have user finish registration
    }

    return (
        <div className="flex flex-row">
            <Sidebar />
        </div>
    )
}

export default Home;
