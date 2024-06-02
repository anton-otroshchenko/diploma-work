import { createAsyncThunk} from '@reduxjs/toolkit';

import { name as sliceName } from '../slices/sites.ts';

// const createSite = createAsyncThunk<
//     unknown,
//     SiteCreateRequestDto,
//     AsyncThunkConfig
// >(`${sliceName}/create-site`, async (payload, { extra, dispatch }) => {
//     const { sitesApi } = extra;
//
//     const site = await sitesApi.createSite(payload);
//
//     dispatch(
//         appActions.navigate(
//             configureString<ValueOf<typeof AppRoute>>(AppRoute.SITES_$SITE_ID, {
//                 siteId: site.id,
//             }),
//         ),
//     );
// });

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