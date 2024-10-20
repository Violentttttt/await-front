import React, { createContext, useState, useEffect } from 'react';
import api from '../dead/api'
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // Функция для проверки токена
    const checkToken = async () => {
        try {
            const response = await api.post(`${process.env.REACT_APP_API_URL}/api/v1/token/verify/app/`, {}, {
                withCredentials: true
            });
            setIsAuthenticated(true);
      
            // console.log('запрос отправился и по идее вернулись куки');
        } catch (error) {
            setIsAuthenticated(false);
            console.error('Error verifying token:', error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        checkToken();

    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post(`${process.env.REACT_APP_API_URL}/api/v1/login/`, credentials, {
                withCredentials: true
            });
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw new Error('Login failed');
        }
    };

    const logout = async () => {
        try {
            const response = await api.post(`${process.env.REACT_APP_API_URL}/api/v1/logout/`, {}, {
                withCredentials: true
            });
            setIsAuthenticated(false);
            navigate('/login/')
        } catch (error) {
  

        } 
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
