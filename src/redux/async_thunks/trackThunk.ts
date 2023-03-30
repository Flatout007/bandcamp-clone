import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTracks } from "../../api/nodeHTTP";

export const create = createAsyncThunk("track/new", async (tracks: any, thunkAPI): Promise<any> => {

    try {
        const res = await createTracks(tracks);

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