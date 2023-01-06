import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: 'fb5a6419-5beb-4a59-b225-3db67ec6c11c',
        authority: 'https://login.microsoftonline.com/f365d119-4d90-4b8d-9167-d9c84384f401',
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,

    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                console.log(message);
            },
            logLevel: "Info",
        }

    }
});

pca.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
