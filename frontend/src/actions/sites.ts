import { createAsyncThunk} from '@reduxjs/toolkit';

import { name as sliceName } from '../slices/sites.ts';

const getSites = createAsyncThunk(`${sliceName}/sites`, async (userId: string) => {
    const sites = await fetch('http://localhost:3000/sitesByUserId', {
        method: 'POST',
        body: JSON.stringify({
            userId
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await sites.json();
});

export { getSites };