import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Logout() {
    const history = useNavigate();

    const handleLogout = () => {
        // Очистка токена из localStorage
        localStorage.removeItem('token');
        // Очистка состояния токена (если вы его храните в состоянии)
        // Например, если используете React Context или Redux, сбросьте состояние здесь
        // Пример: dispatch(logoutAction());
        // Перенаправление на страницу входа или главную
        history.push('/login');
    };

    return (
        <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
        </Button>
    );
}
