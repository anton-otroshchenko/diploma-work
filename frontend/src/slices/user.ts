import { createSlice } from '@reduxjs/toolkit';

import {
    signIn,
    signUp,
    getCurrent
} from '../actions/users.ts';

type State = {
    currentUser: any
};

const initialState: State = {
    currentUser: null
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'user',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
        });
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    },
});

export { actions, name, reducer };