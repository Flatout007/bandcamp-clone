import { ActionReducerMapBuilder, createSlice, CreateSliceOptions, PayloadAction, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit"
import { create } from "../async_thunks/trackThunk";
import { RootState } from "../store/store";



const slice: CreateSliceOptions = {
    name: "track",

    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },

    reducers: {
        reset: (state: StateFromReducersMapObject<RootState["track"]>): void => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        }
    },

    extraReducers: function (builder: ActionReducerMapBuilder<any>): void {
        
        builder
            .addCase(create.pending, (state: StateFromReducersMapObject<RootState["track"]>): void => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state: StateFromReducersMapObject<RootState["track"]>, action: PayloadAction<RootState["track"]>): void => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(create.rejected, (state: StateFromReducersMapObject<RootState["track"]>, action: PayloadAction<RootState["track"]>): void => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false;
            })
    },
};

const trackSlice: Slice = createSlice(slice);
export const { reset } = trackSlice.actions;
export default trackSlice.reducer;