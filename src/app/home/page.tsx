"use client"

import Sidebar from "@/components/sidebar/Sidebar";
import { useSupabase } from "@/components/supabase-provider";
import Link from "next/link";

const Home = () => {
    const { session } = useSupabase();

    return (
        <div className="flex flex-row">
            <Sidebar />
        </div>
    )
}

export default Home;
