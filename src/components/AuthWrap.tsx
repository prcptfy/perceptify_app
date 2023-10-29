"use client";

import React from 'react';
import { Session } from '@supabase/supabase-js';
// no cheating!!
interface AuthWrapperProps {
  children: React.ReactElement;
  session: Session;
}

const AuthWrapper = ({ children, session }: AuthWrapperProps ) => {
  if (!session) {
    const blacklistedPaths = ['/', '/login', '/register'];
    if (!blacklistedPaths.includes(window.location.pathname)) {
      window.location.href = '/login';
    }
  }

  return children;
};

export default AuthWrapper;
