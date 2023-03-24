'use client'

import {
    createContext,
    useContext,
    useState,
    ReactNode
} from 'react';
import { createClient } from '../utils/supabase-browser';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/db_types';

type SupabaseContext = {
    supabase: SupabaseClient<Database>,
};

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider = ({ children }: { children: ReactNode }) => {
    const [supabase] = useState(() => createClient());

    return (
        <Context.Provider value={{ supabase }}>
            <>{ children }</>
        </Context.Provider>
    );
};

export const useSupabase = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    } else return context;
};

export default SupabaseProvider;
