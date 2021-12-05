import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import { currentTrackiIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';

const Player = () => {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session, status } = useSession();
  const [volumn, setVolumn] = useState(50);
  const [currentTrackiId, setCurrentTrackiId] =
    useRecoilState(currentTrackiIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now playing: ', data.body?.item);
        setCurrentTrackiId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackiId) {
      fetchCurrentSong();
      setVolumn(50);
    }
  }, [currentTrackiId, spotifyApi, session]);

  return (
    <div className="grid grid-col-3 text-xs md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images?.[0]?.url}
          alt={songInfo?.name}
          className="hidden md:inline h-10 w-10"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
