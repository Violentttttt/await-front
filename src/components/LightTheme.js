import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#444444',
        },
        primary: {
            main: '#3f51b5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f50057',
            contrastText: '#ffffff',
        },
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
    },
});

export default lightTheme;
