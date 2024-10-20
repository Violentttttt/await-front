import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";

export default function MbMatchList({ matches, handleAction }) {
    return (
        <Box>
            {matches && matches.length > 0 ? (
                matches.map((match) => (
                    <Card 
                        key={match.maybematch.id} 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, // Вертикально на маленьких устройствах
                            mb: 2, 
                            borderRadius: '12px', 
                            boxShadow: 3 
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ 
                                width: { xs: '100%', sm: 150 },  // Полная ширина на маленьких экранах
                                height: { xs: 200, sm: 150 },    // Увеличиваем высоту на маленьких экранах
                                objectFit: 'cover', 
                                borderRadius: { xs: '12px 12px 0 0', sm: '12px' } // Радиусы зависят от ориентации карточки
                            }}
                            image={match.his_picture.image ? `${process.env.REACT_APP_API_URL}${match.his_picture.image}` : `https://robohash.org/${match.search_name.name}`}
                            alt="Profile"
                        />
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                p: 2, 
                                flex: 1 
                            }}
                        >
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {match.search_name.name === '' ? 'Вы искали человека' : `Вы искали: ${match.search_name.name}`}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Похоже, что мы его нашли... Это он?
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {match.is_it_him.real_name}
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                {match.about_him.about}
                            </Typography>
                        </Box>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                p: 2, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: { xs: '100%', sm: 'auto' }  // Полная ширина на маленьких экранах
                            }}
                        >
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ 
                                    mb: 1, 
                                    width: { xs: '100%', sm: '100%' }  // Полная ширина на маленьких устройствах
                                }} 
                                onClick={() => handleAction('True', match.maybematch.id)}
                            >
                                Принять
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                sx={{ 
                                    width: { xs: '100%', sm: '100%' }  // Полная ширина на маленьких устройствах
                                }} 
                                onClick={() => handleAction('False', match.maybematch.id)}
                            >
                                Отклонить
                            </Button>
                        </Box>
                    </Card>
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>У Вас пока нет совпадений</Typography>
            )}
        </Box>
    );
}