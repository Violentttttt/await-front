import React from "react";
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField } from "@mui/material";


const theme = createTheme({
    palette: {
        mode: 'dark', 
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        },
        text: {
            primary: '#ffffff',
            secondary: '#cfe0fc'
        },
        primary: {
            main: '#cfe0fc',
            contrastText: '#000000' 
        },
        secondary: {
            main: '#000000',
            contrastText: '#ffffff' 
        }
    },
    typography: {
        h1: {
            fontSize: '3rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
    }
});
export default theme