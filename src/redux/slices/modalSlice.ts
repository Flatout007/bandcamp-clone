import { createSlice, CreateSliceOptions, Slice, StateFromReducersMapObject } from "@reduxjs/toolkit"
import { signin, signup } from "../async_thunks/artistThunk";

const slice: CreateSliceOptions = {
    name: "modal",

    initialState: {
        loginModalStatus: false,
        signupModalStatus: false
    },

    reducers: {

        openLoginModal: function (state: StateFromReducersMapObject<any>) {
            state.loginModalStatus = true;
        },

        closeLoginModal: function (state: StateFromReducersMapObject<any>) {
            state.loginModalStatus = false;
        },

        openSignUpModal: function (state: StateFromReducersMapObject<any>) {
            state.signupModalStatus = true;
        },

        closeSignUpModal: function (state: StateFromReducersMapObject<any>) {
            state.signupModalStatus = false;
        }
    },

    extraReducers(builder) {
        builder
            .addCase(signin.fulfilled, (state: StateFromReducersMapObject<any>): void => {
                state.loginModalStatus = false;
            })
            .addCase(signup.fulfilled, (state: StateFromReducersMapObject<any>): void => {
                state.signupModalStatus = false;
            });
            
    },
};

const modal: Slice = createSlice(slice);

export const {
    openLoginModal,
    closeLoginModal,
    openSignUpModal,
    closeSignUpModal
} = modal.actions;

export default modal.reducer;