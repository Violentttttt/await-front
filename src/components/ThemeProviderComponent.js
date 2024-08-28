import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './path/to/darkTheme'; // Путь к вашей тёмной теме
import lightTheme from './LightTheme'; 

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

const ThemeProviderComponent = ({ children }) => {
    const [mode, setMode] = useState('light'); // По умолчанию светлая тема

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeToggleContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};

export default ThemeProviderComponent;
