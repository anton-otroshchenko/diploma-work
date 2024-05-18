import { createSlice } from '@reduxjs/toolkit';


import {
    getSectionsBySiteId
} from '../actions/sections.ts';

type State = {
    sections: {
        type: string;
        content: any;
    }[];
};

const initialState: State = {
    sections: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'sections',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getSectionsBySiteId.pending, () => {
            // state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getSectionsBySiteId.fulfilled, (state, action) => {
            // state.dataStatus = DataStatus.FULFILLED;
            state.sections = action.payload;
        });
        builder.addCase(getSectionsBySiteId.rejected, () => {
        });
    },
});

export { actions, name, reducer };