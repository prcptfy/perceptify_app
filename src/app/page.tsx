'use client';

import styles from './page.module.css';

import { useEffect } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import { redirect } from 'next/navigation';
import { Spinner } from '@nextui-org/react';

export default function Redirect() {
  const { supabase, session } = useSupabase();

  useEffect(() => {
    if (session) redirect('/home/overview');
    else redirect('/login');
  }, []);

  return (
    <main className={styles.main}>
      <Spinner
        size="lg"
        color="secondary"
        label="Perceptifying"
        labelColor="secondary"
      />
    </main>
  );
}
