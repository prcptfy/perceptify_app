'use client';
import React from 'react';
import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Spinner
          label="Perceptifying"
          color="secondary"
          labelColor="secondary"
          size="lg"
        />
      </div>
    </>
  );
}
