import React, { useState, useEffect, lazy, Suspense } from "react";
import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../components/Theme";
import axios from "axios";
import Cube from "../animations/cube";

const LazyProfileData = lazy(() => import('../lazy-components/Profile')); // Ленивый импорт

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [optionalData, setOptionalData] = useState({});
    const [imageUrl, setImageUrl] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false); // Новый стейт для отслеживания загрузки изображения
    const [highlighted, setHighlighted] = useState(false);

    // Получение данных профиля
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/account/`, {
            withCredentials: true 
        })
        .then(response => {
            setProfileData(response.data); 
        })
        .catch(error => {
            console.log(error);
        });
    }, []); 

    // Получение дополнительных данных
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/account/optionalinfo/`, {
            withCredentials: true 
        })
        .then(response => {
            setOptionalData(response.data || {});

            // Проверяем наличие изображения и пытаемся его загрузить
            if (response.data.image) {
                const img = new Image();
                img.src = response.data.image;

                img.onload = () => {
                    setImageUrl(response.data.image);  // Устанавливаем URL изображения
                    setImageLoaded(true);  // Изображение загружено
                };

                img.onerror = () => {
                    setImageLoaded(true);  // Ошибка загрузки изображения
                };
            } else {
                setImageLoaded(true);  // Если изображения нет, считаем, что загрузка завершена
            }
        })
        .catch(error => {
            console.log('Error loading data:', error);
            setImageLoaded(true);  // В случае ошибки также показываем данные
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOptionalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('surname', optionalData.surname || '');
        formData.append('about', optionalData.about || '');
        formData.append('country', optionalData.country || '');
        formData.append('town', optionalData.town || '');
        formData.append('study', optionalData.study || '');
        formData.append('work', optionalData.work || '');

        axios.put(`${process.env.REACT_APP_API_URL}/api/v1/account/optionalinfo/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true 
        })
        .then(response => {
            console.log('Data updated successfully', response.data);
        })
        .catch(error => {
            console.log('Response error data:', error.response.data);
            console.log('Response status:', error.response.status);
        });
    };

    const handleImageClick = () => {
        setHighlighted(true);
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/account/optionalinfo/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true 
                });

                const newImageUrl = URL.createObjectURL(file);
                setImageUrl(newImageUrl); // Обновляем URL изображения
                setImageLoaded(true);     // Изображение загружено
            } catch (error) {
                console.log(error);
            }
        };
        fileInput.click();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                <Typography variant="h1" sx={{ my: 8, textAlign: 'center' }}>Личный кабинет</Typography>
                {(profileData && imageLoaded) ? ( // Показываем компонент только когда данные профиля и изображение загружены
                    <Suspense fallback={<Cube />}>
                        <LazyProfileData 
                            profileData={profileData} 
                            optionalData={optionalData} 
                            handleSubmit={handleSubmit} 
                            handleInputChange={handleInputChange}
                            handleImageClick={handleImageClick} 
                            imageUrl={imageUrl}
                            imageUpdated={imageLoaded} // Используем новое состояние загрузки изображения
                            setHighlighted={setHighlighted}
                        />
                    </Suspense>
                ) : (
                    <Box sx={{
                        position: 'fixed',   
                        top: '50%',          
                        left: '50%',         
                        transform: 'translate(-50%, -50%)', 
                        zIndex: 9999         
                      }}>
                        <Cube /> 
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
}