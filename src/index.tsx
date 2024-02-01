import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CssVarsProvider, extendTheme, GlobalStyles} from "@mui/joy";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark" defaultColorScheme="dark" >
        <GlobalStyles
            styles={{
                html: {
                    height: 'calc(100% - 80px)',
                },
                body: {
                    background: 'var(--joy-palette-background-body)',
                    height: '100%',
                },
                '#root': {
                    height: '100%',
                },
            }}
        />
        <App />
    </CssVarsProvider>
  </React.StrictMode>
);