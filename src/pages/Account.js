import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import BottomNav from "../components/BottomNav";
import Profile from "../components/Profile";
import History from "../pages/History"
import Balance from "./Balance";
import theme from "../components/Theme";
import api from "../dead/api";
import { AuthContext } from "../context/AuthContext";
import MayBeMatchOrMatch from "../components/MayBeMatchOrMatch";
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket, disconnectWebSocket, sendMessage } from '../actions/webSocketActions';


export default function Account() {
    const dispatch = useDispatch();
    const [content, setContent] = useState(<Profile />);
    const [count, setCount] = useState(0);
    const [mcount, setMcount] = useState(0);
    const [mayBeMatches, setMayBeMatches] = useState(null);
    const { logout } = React.useContext(AuthContext);


    // const dispatch = useDispatch();
    // const messages = useSelector((state) => state.websocket.messages);
    // const isConnected = useSelector((state) => state.websocket.isConnected);
  
    // useEffect(() => {
    //   dispatch(connectWebSocket());
  
    //   return () => {
    //     dispatch(disconnectWebSocket());
    //   };
    // }, [dispatch]);

    const handleNavChange = (newValue) => {
        switch (newValue) {
            case 'profile':
                setContent(<Profile />);
                break;
            case 'find':
                window.location.href = `/world`;
                break;
            case 'matches':
                setContent(<MayBeMatchOrMatch mayBeMatches={mayBeMatches} />);
                break;
            case 'balance':
                setContent(<Balance/>)
            case 'logout':
                dispatch(disconnectWebSocket())
                logout();
                break;
            case 'more':

                break;
            case 'history':
                setContent(<History/>);
                break;
            default:
                setContent('');
        }
    };

    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ flex: 1 }}>
                    {content}
                </Box>
                <BottomNav onChange={handleNavChange} count={count} mcount={mcount}/>
            </Container>

        </ThemeProvider>
    );
}