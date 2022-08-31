import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './utils/constants';
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles></GlobalStyles>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    // </React.StrictMode>
);

