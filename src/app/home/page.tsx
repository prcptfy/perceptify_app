"use client"

import Sidebar from "@/components/sidebar/Sidebar";
import { useSupabase } from "@/components/supabase-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { session } = useSupabase();

    useEffect(() => {
        router.push("/home")
    }, []);

    return (
        <div className="flex flex-row">
            <Sidebar />
        </div>
    )
}

export default Home;
