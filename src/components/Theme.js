import React from "react";
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField } from "@mui/material";


const theme = createTheme({
    palette: {
        mode: 'dark', 
        background: {
            default: '#0d0d0d',
            paper: '#121212'
        },
        text: {
            primary: '#ffffff',
            secondary: '#DCDCDC'
        },
        primary: {
            main: '#ffffff',
            contrastText: '#000000' 
        },
        secondary: {
            main: '#7FFF00',
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