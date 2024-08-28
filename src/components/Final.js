import {React, useState, useEffect} from "react";
import axios from "axios";
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField , Grid, Card, CardMedia, CardContent, Divider, Button} from "@mui/material";
import theme from "../components/Theme"
import image from "../image.jpeg"
import lightTheme from './LightTheme'; 


export default function Final(){

    const [token, setToken] = useState(null);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');
        setToken(tokenFromURL);
    
        if (tokenFromURL){
                axios.get(`${process.env.REACT_APP_API_URL}/api/v1/match`, {
                    headers: {
                    'Authorization': `Token ${tokenFromURL}`,
                    }
                })
                .then(function (response) {
                    console.log(response);
                    setMatches(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
    }, []);


    return(
        <ThemeProvider theme={lightTheme}>
          <Container>
            <Typography variant="h1" sx={{ mt: 12, mb:8, textAlign: 'center' }}>Match</Typography>
            <Grid container spacing={4}>
              {matches.map(match => (
                <Grid item xs={12} sm={6} md={4} key={match.id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 200, objectFit: 'cover' }}
                      image={image}
                      alt="Session 1"
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h2" color="primary" sx={{ mb: 2 }}>
                        Детали
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Пользователь 1:</strong> {match.user_1.real_name}
                      </Typography>

                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Пользователь 2:</strong> {match.user_2.real_name}
                      </Typography>
         
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
    
           ) }