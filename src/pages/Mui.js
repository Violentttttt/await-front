import {React, useState, useEffect} from "react";
import ButtonUsage from "../components/ButtonUsage";
import { Box, Button, Container, createTheme, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import TimeRange from "../components/TimeRange";
import BaseTimeline from "../components/BaseTimiline";
import TimeField from "../components/TimeField";
import MatchNav from "../components/MatchNav"
import SwipeableEdgeDrawer from "../components/Drawer";


const theme = createTheme({
    palette: {
        primary: {
            main: '#013e87'
        }, 
        secondary: {
            main: '#2e74c9'
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

const serviceList = ["Service 1" , 'Service 2' , 'Service 3']





export default function Mui() {

    const [time, setTime] = useState(null);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('authToken', token);
        }
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();

            const timeData = {
                time: time ? time.format('HH:mm') : null,
            };

            console.log(timeData)
            saveTime(timeData)
    
        
    };
    
    
    async function saveTime(timeData) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Токен не найден в localStorage');
            return;
        }
    
        const formData = new FormData();
        formData.append('time', timeData.time)
        // Используйте уже отформатированные данные
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/save_info/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка при сохранении данных:', errorData);
                return;
            }
    
            const result = await response.json();
            console.log('Данные успешно сохранены:', result);
        } catch (error) {
            console.error('Ошибка при запросе:', error);
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
                <MatchNav/>
                <Typography variant="h1" sx={{my:4, textAlign:'center', color:'primary.main'}}>Service</Typography>
                <Typography variant="h2">Overview</Typography>
                <Box sx={{display:'flex' , flexDirection:{xs:"column", md:"row"} , justifyContent:'space-between' , gap:4 , pt:4}}>
                {serviceList.map((service)=>{
                            return(
                     <Box sx={{m:3 , pt:4}}> 
                            <Paper elevation={3} sx={{p:4 , width:{xs:1 ,md:320}}}>
                        <Typography variant="h3" >{service}</Typography>
                        <Typography sx={{mt:2 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                        <Button variant="outlined">Learn more</Button>
                            </Paper>

                     </Box>)
                })}


                </Box>

                
                <form onSubmit={handleSubmit}>
                <TimeField
                value={time} 
                onChange={setTime}
                />
                <ButtonUsage type="submit"/>
                </form>
  

  <Container>
    <SwipeableEdgeDrawer  component={<ButtonUsage/>}/>
  </Container>
                <BaseTimeline/>
        </ThemeProvider>
    );
}
