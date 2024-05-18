import { createAsyncThunk} from '@reduxjs/toolkit';


const getSectionsBySiteId = createAsyncThunk(`sections/sections`, async (siteId: string) => {
    const sections = await fetch(`http://localhost:3000/sections/${siteId}`);

    return await sections.json();
});

export { getSectionsBySiteId };