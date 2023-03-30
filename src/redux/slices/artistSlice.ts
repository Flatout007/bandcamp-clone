import { ActionReducerMapBuilder, createSlice, CreateSliceOptions, PayloadAction, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit"
import { edit, getAlbums, index, logout, signin, signup } from "../async_thunks/artistThunk";
import { RootState } from "../store/store";

const artist: string = localStorage.getItem("artist") || "";

const slice: CreateSliceOptions = {
    name: "artist",

    initialState: {
        artist: artist ? JSON.parse(artist) : artist,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
        albums: [],
        artists: [],
    },

    reducers: {
        reset: (state: StateFromReducersMapObject<RootState["artist"]>): void => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        },
      
    },

    extraReducers: function (builder: ActionReducerMapBuilder<any>): void {
        builder
            .addCase(signin.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(signin.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isSuccess = true;
                state.artist = action.payload
            })
            .addCase(signin.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.artist = null;
            })
            .addCase(signup.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isSuccess = true;
                state.artist = action.payload
            })
            .addCase(signup.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.artist = null;
            })
            .addCase(getAlbums.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(getAlbums.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.albums = action.payload
            })
            .addCase(getAlbums.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(edit.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(edit.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(edit.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(index.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(index.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.artists = action.payload
            })
            .addCase(index.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.pending, (state: StateFromReducersMapObject<RootState["artist"]>): void => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.artist = null;
                state.isSuccess = false;
            })
            .addCase(logout.rejected, (state: StateFromReducersMapObject<RootState["artist"]>, action: PayloadAction<RootState["artist"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
};

const artistSlice: Slice = createSlice(slice);
export const { reset } = artistSlice.actions;
export default artistSlice.reducer;