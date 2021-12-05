import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackiIdState } from '@/atoms/songAtom';
import useSpotify from './useSpotify';

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);
  const [currentTrackiId, setCurrentTrackiId] =
    useRecoilState(currentTrackiIdState);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackiId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackiId}`,
          {
            headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackiId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
