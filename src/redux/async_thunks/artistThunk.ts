import { createAsyncThunk } from "@reduxjs/toolkit";
import { editArtist, getAllArtist, getArtistAlbums, signInArtist, signUpArtist } from "../../api/nodeHTTP";

/** 
@description These functions generate authentication action types for asynchronous 
action creators and is used internally by the createAsyncThunk function.
*/
export const signin = createAsyncThunk("artist/signin", async (artist: any, thunkAPI: any): Promise<any> => {
    try {
        const res = await signInArtist(artist);

        if (res) {
            return res;
        } else {
            return thunkAPI.rejectWithValue("Invalid username or password");
        }
    } catch (error: any) {
        const message = error.response.data;

        console.log(error, message);

        return thunkAPI.rejectWithValue(message);
    }
});

export const signup = createAsyncThunk("artist/signup", async (artist: any, thunkAPI: any): Promise<any> => {

    try {
        const res = await signUpArtist(artist);

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

export const edit = createAsyncThunk("artist/edit", async (artist: any, thunkAPI: any): Promise<any> => {

    try {
        const res = await editArtist(artist);

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

export const index = createAsyncThunk("artist/", async (artist: any, thunkAPI: any): Promise<any> => {

    try {
        const res = await getAllArtist();

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

export const getAlbums = createAsyncThunk("artist/albums", async (artistId: any, thunkAPI: any): Promise<any> => {
    try {
        const res = await getArtistAlbums(artistId);

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
})

export const logout = createAsyncThunk("artist/logout", async function name(): Promise<any> {
    localStorage.removeItem("artist");
});

