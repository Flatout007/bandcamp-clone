import { configureStore } from "@reduxjs/toolkit";
import { AlbumPayload, ArtistPayload, TrackPayload } from "../../types";
import albumSlice from "../slices/albumSlice";
import artistSlice from "../slices/artistSlice";
import modalSlice from "../slices/modalSlice";
import playerSlice from "../slices/playerSlice";
import trackSlice from "../slices/trackSlice";

const store = configureStore({
   reducer: {
      artist: artistSlice,
      modal: modalSlice,
      album: albumSlice,
      track: trackSlice,
      player: playerSlice
   }
});

export default store;

/**@description the root state of the entire store */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @description The state of the artist in the store.
 */
export type ArtistState = {
   artist?: any,
   isLoading?: boolean,
   isError?: boolean,
   isSuccess?: boolean,
   message?: string,
   email?: string,
   name?: string,
   bio?: string,
   photo?: string,
   _id?: string,
   albums?: Array<AlbumPayload>,
   currentId?: string,
   artists?: Array<ArtistState | ArtistPayload>,
   location?: string
};

/**
 * @description the state of the album in the store
 */
export type AlbumState = {
   album?: any,
   isLoading?: boolean,
   isError?: boolean,
   isSuccess?: boolean,
   message?: string,
   albums: Array<AlbumPayload>,
   currentId: string,
   tracks: Array<TrackPayload>
};

/**
 * @description the state of the track in the store
 */
export type TrackState = {
   album?: any,
   isLoading?: boolean,
   isError?: boolean,
   isSuccess?: boolean,
   message?: string,
};

/**
 * @description the state of the modal in the store
 */
export type ModalState = {
   loginModalStatus: boolean,
   signupModalStatus: boolean
};


/**
 * @description the state of the player in the store
 */
export type PlayerState = {
   isPlaying: boolean,
   isPaused: boolean,
   isStopped: boolean,
   songs: Array<any>,
   currentTrack: any
};
