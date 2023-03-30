import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAlbum, getAlbumTracks, getAllAlbums } from "../../api/nodeHTTP";

export const create = createAsyncThunk("album/new", async (album: any, thunkAPI): Promise<any> => {

    try {
        const res = await createAlbum(album);

        if (res) {
            return res;
        }
    } catch (error: any) {

        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const getAlbums = createAsyncThunk("albums/", async (object, thunkAPI: any): Promise<any> => {

    try {
        const res = await getAllAlbums();

        console.log(res);

        if (res) {
            return res;
        }
    } catch (error: any) {

        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const getTracks = createAsyncThunk("tracks/", async (albumId: any, thunkAPI: any): Promise<any> => {

    try {
        const res = await getAlbumTracks(albumId);

        if (res) {
            return res;
        }
    } catch (error: any) {

        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});