import { createSlice, CreateSliceOptions, current, PayloadAction, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit"

const slice: CreateSliceOptions = {
    name: "player",

    initialState: {
        currentTrack: null,
        isPlaying: false,
        isPaused: true,
        isStopped: true,
        tracks: []
    },

    reducers: {
        reset: (state: StateFromReducersMapObject<any>, action: PayloadAction<any>): void => {
            state.isPlaying = null;
            state.isPaused = null;
            state.currentTrack = null;
        },
        pauseTrack: (state: StateFromReducersMapObject<any>, action: PayloadAction<any>): void => {
            state.isPlaying = false;
            state.isPaused = true;
        },
        playTrack: (state: StateFromReducersMapObject<any>, action: PayloadAction<any>): void => {

            state.isPlaying = true;
            state.isPaused = false;
            state.isStopped = false;

        },
        getCurrentTrack: (state: StateFromReducersMapObject<any>, action: PayloadAction<any>): void => {
            state.currentTrack = action.payload
        },
        getPlayerTracks: (state: StateFromReducersMapObject<any>, action: PayloadAction<any>): void => {
            state.tracks = action.payload;
        }
    }
};

const playerSlice: Slice = createSlice(slice);
export const { reset, playTrack, getCurrentTrack, pauseTrack, getPlayerTracks } = playerSlice.actions;
export default playerSlice.reducer;