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
        // builder.addCase(createSite.pending, (state) => {
        //     state.dataSiteStatus = DataStatus.PENDING;
        // });
        // builder.addCase(createSite.fulfilled, (state) => {
        //     state.dataSiteStatus = DataStatus.FULFILLED;
        // });
        // builder.addCase(createSite.rejected, (state) => {
        //     state.dataSiteStatus = DataStatus.REJECTED;
        // });
        builder.addCase(signUp.pending, () => {
            // state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            // state.dataStatus = DataStatus.FULFILLED;
            state.currentUser = action.payload.user;
            console.log(state.currentUser)
        });
        builder.addCase(signUp.rejected, () => {
            // state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(signIn.pending, () => {
            // state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload.user;
            console.log(state.currentUser)
        });
        builder.addCase(signIn.rejected, () => {
            // state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            // state.dataStatus = DataStatus.FULFILLED;
            state.currentUser = action.payload;
        });
    },
});

export { actions, name, reducer };