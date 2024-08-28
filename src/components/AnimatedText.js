import React from 'react';
import { Typography } from '@mui/material';

const AnimatedText = ({ text}) => {


    return (
        <Typography
            variant="h4"
            sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                textAlign: 'center', // Центрирование текста
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap', // Позволяет переносить текст на новую строку
            }}
        >

        </Typography>
    );
};

export default AnimatedText;
