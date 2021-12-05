import { atom } from 'recoil';

export const currentTrackiIdState = atom({
  key: 'currentTrackiIdState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
