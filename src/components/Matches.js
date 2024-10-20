import { React, useState, useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMatch, WEBSOCKET_SEND_MESSAGE } from "../actions/webSocketActions";
import { Box, Typography, ThemeProvider, Container } from "@mui/material";
import theme from "../components/Theme";
import api from "../dead/api";
import { AuthProvider } from '../context/AuthContext';
import Cube from "../animations/cube";

// Ленивый импорт компонента MatchList
const LazyMatchList = lazy(() => import('../lazy-components/MbMatchList'));

export default function Matches() {
    const dispatch = useDispatch();
    const matches = useSelector((state) => state.websocket.matches || []); 
    const [loading, setLoading] = useState(true);
    const [showNoMatchesMessage, setShowNoMatchesMessage] = useState(false);

    const handleAction = (action, matchId) => {
        api.post(`${process.env.REACT_APP_API_URL}/api/v1/maybematch`, {
            action: action,
            matchId: matchId,
        }, {
            withCredentials: true 
        })
        .then(function (response) {
            dispatch({
                type: WEBSOCKET_SEND_MESSAGE, 
                payload: {
                    type: 'match_action', 
                    action: action, 
                    matchId: matchId 
                }
            });
            dispatch(removeMatch(matchId));
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    useEffect(() => {
        // Сброс состояния загрузки при изменении списка мэтчей
        if (matches.length > 0) {
            setLoading(false);
        } else {
            setLoading(true); 
        }
    }, [matches]);

    useEffect(() => {
        // Таймер для отображения сообщения через 4 секунды
        const timer = setTimeout(() => {
            if (loading) {
                setShowNoMatchesMessage(true);
            }
        }, 4000);

        // Очистка таймера при завершении загрузки
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 12, textAlign: 'center', fontWeight: 'bold' }}>MayBeMatch</Typography>
            {loading ? (
                <Box 
                    sx={{
                        position: 'fixed',   
                        top: '50%',          
                        left: '50%',         
                        transform: 'translate(-50%, -50%)', 
                        zIndex: 9999         
                    }}
                >
                    <Cube />
                </Box>
            ) : (
                <Suspense fallback={<Cube />}>
                    <LazyMatchList matches={matches} handleAction={handleAction} /> 
                </Suspense>
            )}

            {/* Если загрузка длится более 4 секунд и нет мэтчей */}
            {showNoMatchesMessage && matches.length === 0 && (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                    Похоже, что у вас нет мэтчей
                </Typography>
            )}
        </Container>
    );
}