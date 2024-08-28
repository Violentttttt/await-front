import React, { useState, useEffect } from "react";
import { Box, TextField,ThemeProvider, Typography } from "@mui/material";
import theme from "../components/Theme"
import ButtonUsage from "../components/ButtonUsage";
import AnimatedText from "./AnimatedText";
import axios from "axios";
import lightTheme from './LightTheme'; 


export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [optionalData, setOptionalData] = useState({});
    const [token, setToken] = useState(null);
    const [highlighted, setHighlighted] = useState(false);
    const [imageUpdated, setImageUpdated] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [showThankYou, setShowThankYou] = useState(false);

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '150px',
        objectFit: 'contain',
        marginBottom: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: highlighted ? '0 0 10px 5px #cfe0fc' : 'none', // Добавление теней для выделения

    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');
        setToken(tokenFromURL);
    }, []);
//запрос к customuser (возраст+имя)
    useEffect(() => {
        if (token) { 
            axios.get(`${process.env.REACT_APP_API_URL}/api/v1/account/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            })
            .then(function (response) {
                console.log(response.data);
                setProfileData(response.data); 
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }, [token]); 
//get запрос к optionalinfo(все остальное шушело , кроме картинки)
useEffect(() => {
    if (token) { 
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/account/optionalinfo/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        .then(function (response) {
            console.log('GET response data:', response.data);
            setOptionalData(response.data || {});
        })
        .catch(function (error) {
            console.log('Error loading data:', error);
        });
    }
}, [token]);

//put запрос к optionalinfo
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
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        console.log('Data updated successfully', response.data);
    })
    .catch(error => {
        console.log('Response error data:', error.response.data);
        console.log('Response status:', error.response.status);
    });
};


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOptionalData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

//отдельный put к optionalinfo для картинки
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
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            // Обновляем URL изображения
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);

            // Обновляем optionalData для использования нового изображения
            setOptionalData((prevData) => ({
                ...prevData,
                image: newImageUrl, // Обновляем URL изображения в optionalData
            }));

            setImageUpdated(true); // Анимация
            setShowThankYou(true);
        } catch (error) {
            console.log(error);
        }
    };
    fileInput.click();
};



useEffect(() => {
    if (imageUpdated) {
        const timer = setTimeout(() => {
            setImageUpdated(false);

            setHighlighted(false);
        }, 1500); // Продолжительность анимации
        return () => clearTimeout(timer);
    }
}, [imageUpdated]);

useEffect(() => {
    const handleClickOutside = (event) => {
        // Проверяем, был ли клик вне изображения
        if (event.target.tagName !== 'IMG') {
            setHighlighted(false);
        }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);




return (
    <ThemeProvider theme={lightTheme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
            <Typography variant="h1" sx={{ my: 8, textAlign: 'center' }}>Личный кабинет</Typography>
            {profileData ? (
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 4,
                                alignItems: 'center',
                                px: { xs: 2, sm: 4 },
                                py: 2
                            }}
                        >
                                <img
                                    src={imageUrl || (optionalData.image ? `${process.env.REACT_APP_API_URL}${optionalData.image}` : `https://robohash.org/${profileData.real_name}`)}
                                    alt="Profile"
                                    style={{ 
                                        ...imageStyle, 
                                        maxWidth: '100%', 
                                        height: 'auto' 
                                    }}
                                    onClick={handleImageClick}
                                />
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center',
                                        textAlign: { xs: 'center', sm: 'left' },
                                        maxWidth: { xs: '100%', sm: 'auto' } 
                                    }}
                                >
                                {imageUpdated===false?(
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                mb: 1, 
                                fontSize: { xs: '1.5rem', sm: '2rem' },
                                textAlign: 'center',  
                                alignSelf: 'center'
                                }}
                                > Обязательно установите картинку</Typography>
                                <Typography 
                                variant="body1" 
                                sx={{ 
                                fontSize: { xs: '0.875rem', sm: '1rem' }, 
                                lineHeight: { xs: 1.5, sm: 1.75 },
                                }}
                                >Если Вас будут искать, то искусственный интеллект будет сверять данные именно по предоставленному изображению.</Typography>
                            </Box>
                                 ) : (
                                    <Box sx={{ width: '100%', textAlign: 'center' }}> 
                                        <AnimatedText text="Спасибо за установку картинки!"  />
                                    </Box>
                                 )}
                                </Box>
                        </Box>


                        <TextField
                            label='Ваше имя'
                            value={profileData.real_name || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            fullWidth
                            multiline
                            sx={{ my: 2 }}
                        />
                        <TextField
                            label='Возраст, который Вы указали при регистрации'
                            value={profileData.age || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            fullWidth
                            multiline
                        />
                        <Typography variant="h2" sx={{ my: 4, textAlign: 'center' }}>Дополнительная информация</Typography>
                        <Typography sx={{ mb: 4, textAlign: 'center' }}>
                            Чем больше данных предоставите - тем выше вероятность найти совпадение
                        </Typography>
                        <TextField
                            label='Фамилия'
                            name="surname"
                            value={optionalData.surname || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <TextField
                            label='Расскажите о себе (например об увлечениях или хобби)'
                            name="about"
                            value={optionalData.about || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <TextField
                            label='Страна'
                            name="country"
                            value={optionalData.country || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <TextField
                            label='Город'
                            name="town"
                            value={optionalData.town || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <TextField
                            label='Образование'
                            name="study"
                            value={optionalData.study || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <TextField
                            label='Работа'
                            name="work"
                            value={optionalData.work || ''}
                            sx={{ my: 2 }}
                            variant="outlined"
                            fullWidth
                            onChange={handleInputChange}
                        />
                        <ButtonUsage content='Сохранить' type='submit'/>
                        
                    </form>
                </Box>
            ) : (
                <p>loading...</p>
            )}
        </Box>
    </ThemeProvider>
)}