import React from 'react';
import ReactDOM from "react-dom/client";
import { App as Sites } from './App.tsx';
import './assets/css/styles.scss';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {Site} from "./components/Site.tsx";
import SignUp from "./components/Sign-up.tsx";
import SignIn from "./components/Sign-in.tsx";
import { ToastContainer } from 'react-toastify';

const theme = extendTheme({
    config: {
        useSystemColorMode: true,
        initialColorMode: "dark"
    }
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Sites/>
    },
    {
        path: '/:siteId',
        element: <Site/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    },
    {
        path: '/sign-in',
        element: <SignIn/>
    }
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <RouterProvider router={router}/>
                    <ToastContainer/>
                </ChakraProvider>
            </Provider>
    </React.StrictMode>
);
