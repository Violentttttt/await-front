import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField } from "@mui/material";
import React, { useState , useEffect} from "react";
import BottomNav from "../components/BottomNav";
import Profile from "../components/Profile";
import theme from "../components/Theme"
import axios from "axios";
import { parseSelectedSections } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import Matches from "../components/Matches";
import MayBeMatchOrMatch from "../components/MayBeMatchOrMatch";
import lightTheme from '../components/LightTheme'; 
import Logout from "./Logout";

export default function Account(){

const [content, setContent] = useState(<Profile/>);
const [token, setToken] = useState(null);
const [count, setCount] = useState(0)
const [mayBeMatches , setMayBeMatches] = useState(null)
    
useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    setToken(tokenFromURL);

    if (tokenFromURL){
        const fetchData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/api/v1/maybematch`, {
                headers: {
                'Authorization': `Token ${tokenFromURL}`,
                }
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data.count)
                setCount(response.data.count)
                setMayBeMatches(response.data.matches)
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000); 

        return () => clearInterval(intervalId); 
    }
}, []);

    // axios(`${process.env.REACT_APP_API_URL}/api/v1/account`);
    



    // Функция для изменения контента при нажатии на кнопку
    const handleNavChange = (newValue) => {
        switch(newValue) {
            case 'profile':
                setContent(<Profile/>);
                break;
            case 'find':
                window.location.href = `/world?token=${token}`
                break;
            case 'matches':
                setContent(<MayBeMatchOrMatch mayBeMatches={mayBeMatches}/>)
                break
            case 'logout':
                setContent(<Logout/>)
                break
            default:
                setContent('');
        }
    };

    return(
        <ThemeProvider theme={lightTheme}>
            <CssBaseline /> 
            <Container maxWidth="md">
   
                    {/* Отображение контента на основе состояния */}
                    <Box sx={{ flex: 1, }}>
                        {content}
                    </Box>
                 
                    <BottomNav onChange={handleNavChange} count={count}/>
     
                </Container>
        </ThemeProvider>
    );
}
