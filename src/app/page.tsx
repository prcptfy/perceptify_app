'use client';

import styles from './page.module.css';

import { useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { redirect } from 'next/navigation';

export default function Redirect() {
  const { supabase, session } = useSupabase();

  useEffect(() => {
    if (session) redirect('/home/overview');
    else redirect('/login');
  }, []);

  return <main className={styles.main}>Loading...</main>;
}
