import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from "./utils/constants";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles></GlobalStyles>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
