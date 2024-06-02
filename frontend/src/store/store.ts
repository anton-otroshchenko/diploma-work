import { configureStore } from '@reduxjs/toolkit'
import { reducer as sitesReducer } from '../slices/sites.ts';
import { reducer as sectionsReducer } from '../slices/sections.ts';
import { reducer as userReducer } from '../slices/user.ts';

export const store = configureStore({
    reducer: {
        sections: sectionsReducer,
        sites: sitesReducer,
        user: userReducer,
    },
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { type RootState, type AppDispatch };