import { createSlice } from '@reduxjs/toolkit';


import {
    getSites
} from '../actions/sites.ts';

type State = {
    sites: {
        id: string;
        name: string
    } [];
    currentSite: {
        id: string;
        name: string
    } | null;
};

const initialState: State = {
    sites: [],
    currentSite: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'sites',
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
        builder.addCase(getSites.pending, () => {
            // state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getSites.fulfilled, (state, action) => {
            // state.dataStatus = DataStatus.FULFILLED;
            state.sites = action.payload;
        });
        builder.addCase(getSites.rejected, () => {
            // state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };