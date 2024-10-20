import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import ButtonUsage from "../components/ButtonUsage";

const ProfileData = ({ 
    profileData, 
    optionalData, 
    handleSubmit, 
    handleInputChange, 
    handleImageClick, 
    imageUrl, 
    imageUpdated, 
    setHighlighted 
}) => {
    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '150px',
        objectFit: 'contain',
        marginBottom: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
    };

    return (
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
                        style={imageStyle}
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
    
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography 
                                    variant="h4" 
                                    sx={{ 
                                        mb: 1, 
                                        fontSize: { xs: '1.5rem', sm: '2rem' },
                                        textAlign: 'center',  
                                        alignSelf: 'center'
                                    }}
                                >
                                    Обязательно установите картинку
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontSize: { xs: '0.875rem', sm: '1rem' }, 
                                        lineHeight: { xs: 1.5, sm: 1.75 },
                                    }}
                                >
                                    Если Вас будут искать, то искусственный интеллект будет сверять данные именно по предоставленному изображению.
                                </Typography>
                            </Box>

                    </Box>
                </Box>

                {/* Остальные поля профиля */}
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
    );
};

export default ProfileData;