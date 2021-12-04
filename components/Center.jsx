import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { shuffle } from 'lodash';
import { playlistState, playlistIdState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import { Songs } from '.';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log('Something went wrong!', err));
  }, [playlistId, spotifyApi]);

  console.log('playlist', playlist);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img
            src={session?.user?.image}
            alt={session?.user?.name}
            className="rounded-full w-10 h-1-0"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
