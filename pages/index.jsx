import React from 'react';
import Head from 'next/head';
import { Center, Sidebar } from '@/components/index';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Next Spotify</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
