import { ActionReducerMapBuilder, createSlice, CreateSliceOptions, PayloadAction, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit"
import { create, getAlbums, getTracks } from "../async_thunks/albumThunk";
import { RootState } from "../store/store";

const slice: CreateSliceOptions = {
    name: "album",

    initialState: {
        albums: [],
        tracks: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },

    reducers: {
        reset: (state: StateFromReducersMapObject<RootState["album"]>): void => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
       
    },

    extraReducers: function (builder: ActionReducerMapBuilder<any>): void {
        builder
            .addCase(create.pending, (state: StateFromReducersMapObject<RootState["album"]>): void => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(create.rejected, (state: StateFromReducersMapObject<RootState["album"]>, action: PayloadAction<any>): void => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.payload);
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getAlbums.pending, (state: StateFromReducersMapObject<RootState["album"]>): void => {
                state.isLoading = true;
            })
            .addCase(getAlbums.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<any>): void => {
                state.isLoading = false;
                state.isError = false;
                state.albums = action.payload;
            })
            .addCase(getAlbums.rejected, (state: StateFromReducersMapObject<RootState["album"]>, action: PayloadAction<any>): void => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getTracks.pending, (state: StateFromReducersMapObject<RootState["album"]>): void => {
                state.isLoading = true;
            })
            .addCase(getTracks.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<any>): void => {
                state.isLoading = false;
                state.isError = false;
                state.tracks = action.payload
            })
            .addCase(getTracks.rejected, (state: StateFromReducersMapObject<RootState["album"]>, action: PayloadAction<any>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
};

const albumSlice: Slice = createSlice(slice);
export const { reset } = albumSlice.actions;
export default albumSlice.reducer;