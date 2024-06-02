import { createAsyncThunk} from '@reduxjs/toolkit';

const sliceName = 'user'

const signUp = createAsyncThunk(`${sliceName}/sign-up`, async (values: any) => {
    const result =  await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Correctly serialize the body to JSON
    });

    const parsedResult = await result.json();

    if(parsedResult.token){
        localStorage.setItem('token', parsedResult.token)
    }

    return parsedResult;
});

const signIn = createAsyncThunk(`${sliceName}/sign-in`, async (values: any) => {
    const result =  await fetch('http://localhost:3000/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Correctly serialize the body to JSON
    });

    const parsedResult = await result.json();

    console.log('hererere')

    if(parsedResult.token){
        localStorage.setItem('token', parsedResult.token)
    }

    console.log('rererere')

    return parsedResult;
});

const getCurrent = createAsyncThunk(`${sliceName}/current`, async () =>{
    const token = localStorage.getItem('token');
    const result =  await fetch('http://localhost:3000/current', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token
        }), // Correctly serialize the body to JSON
    });

    return await result.json();
})

export { signUp, signIn, getCurrent };