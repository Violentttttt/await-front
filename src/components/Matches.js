import {React, useState , useEffect} from "react";
import { Box, Typography, ThemeProvider, Button, Card, CardContent, CardMedia } from "@mui/material";
import theme from "../components/Theme";
import axios from "axios";
import lightTheme from './LightTheme'; 

export default function Matches({ mayBeMatches: initialMatches }) {

    const [token, setToken] = useState(null);
    const [matches, setMatches] = useState(initialMatches);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');
        setToken(tokenFromURL);
    }, []);

    const handleAction = (action, matchId) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/maybematch`, {
            action: action,
            matchId: matchId,
        }, {
            headers: {
                'Authorization': `Token ${token}`,
            }, 
        })
        .then(function (response) {
            // Удаляем обработанную карточку из состояния
            setMatches(matches.filter(match => match.maybematch.id !== matchId));
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', my: 4, mx: 2 }}>
                <Typography variant="h4" sx={{ my: 8, textAlign: 'center', fontWeight: 'bold' }}>MayBeMatch</Typography>
                <Box>
                    {matches && matches.length > 0 ? (
                        matches.map((match) => (
                            <Card key={match.maybematch.id} sx={{ display: 'flex', flexDirection: 'row', mb: 2, borderRadius: '12px', boxShadow: 3 }}>
                                
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '12px' }}
                                    image={match.his_picture.image ? `${process.env.REACT_APP_API_URL}${match.his_picture.image}` : '/placeholder-image.png'}
                                    alt="Profile"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flex: 1 }}>
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
                                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        sx={{ mb: 1, width: '100%' }} 
                                        onClick={() => handleAction('True', match.maybematch.id)}
                                    >
                                        Принять
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        sx={{ width: '100%' }} 
                                        onClick={() => handleAction('False', match.maybematch.id)}
                                    >
                                        Отклонить
                                    </Button>
                                </Box>
                                
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>У вас пока нет совпадений</Typography>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
