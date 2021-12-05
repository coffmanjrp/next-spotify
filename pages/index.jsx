import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { Center, Player, Sidebar } from '@/components/index';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Next Spotify</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

// pre-fetching the session
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
