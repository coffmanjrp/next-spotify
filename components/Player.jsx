import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import useSpotify from '@/hooks/useSpotify';
import { currentTrackiIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';

const Player = () => {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session, status } = useSession();
  const [volume, setVolume] = useState(50);
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

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackiId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackiId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.error(err));
    }, 500),
    []
  );

  return (
    <div className="grid grid-cols-3 text-xs md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-900 text-white">
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
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          // onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon
          className="button"
          // onClick={() => spotifyApi.skipToNext()}
        />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center justify-end pr-5 space-x-3 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          min={0}
          max={100}
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  );
};

export default Player;
