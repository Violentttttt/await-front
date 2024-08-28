import React, { useState , useEffect} from "react";
import dayjs from 'dayjs';
import ButtonUsage from "../components/ButtonUsage";
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField, Grid } from "@mui/material";
import { useLocation } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DataField from "../components/DataField";
import TimeField from "../components/TimeField";
import DateRange from "../components/DataRange";
import TimeRange from "../components/TimeRange";
import Upload from "../components/Upload";
import BaseTimeline from "../components/BaseTimiline";
import theme from "../components/Theme"



export default function Params() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [time, setTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [surname, setSurname] = useState('')
    const [photo, setPhoto] = useState(null); 
    const [errors, setErrors] = useState({});
    const[more_info , setMore_info] = useState('')


    const savedRedMarkerId = JSON.parse(queryParams.get('savedRedMarkerId'));
    const savedBlueMarkerId = JSON.parse(queryParams.get('savedBlueMarkerId'));

const formattedDate = date ? dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ') : null;
const formattedStartDate = startDate ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ssZ') : null;
const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ') : null;
const formattedTime = time ? dayjs(time).format('YYYY-MM-DDTHH:mm:ssZ') : null;
const formattedStartTime = startTime ? dayjs(startTime).format('YYYY-MM-DDTHH:mm:ssZ') : null;
const formattedEndTime = endTime ? dayjs(endTime).format('YYYY-MM-DDTHH:mm:ssZ') : null;



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('authToken', token);
        }
    }, []);

    const validate = () => {
        let tempErrors = {};
        // tempErrors.name = name ? "" : "Это поле обязательно";
        tempErrors.gender = gender ? "" : "Выберите пол";
        if (!date && (!startDate || !endDate)) {
            tempErrors.date = "Выберите дату или диапазон дат";
        } else {
            tempErrors.date = "";
        }

        if (!time && (!startTime || !endTime)) {
            tempErrors.time = "Выберите время или диапазон времени";
        } else {
            tempErrors.time = "";
        }
        if (time && (startDate || endDate)){
            tempErrors.time = "Выберите что-то одно (диапазоны или точные значения)";
            setDate(null)
            setTime(null)
            setStartDate(null)
            setEndDate(null)
            setStartTime(null)
            setEndTime(null)
        }
        if (date && (startTime || endTime)){
            tempErrors.date = "Выберите что-то одно (диапазоны или точные значения)";
            setDate(null)
            setTime(null)
            setStartDate(null)
            setEndDate(null)
            setStartTime(null)
            setEndTime(null)
        }
        if (date && startTime && endTime && startDate && endDate && time){
            tempErrors.time = "Выберите что-то одно (диапазоны или точные значения)";
            setDate(null)
            setTime(null)
            setStartDate(null)
            setEndDate(null)
            setStartTime(null)
            setEndTime(null) 
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleFileChange = (file) => {
        setPhoto(file);
      };
      

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            const sessionData = {
                name,
                gender, 
                date: formattedDate,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                time: formattedTime,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                surname, 
                more_info,
                savedRedMarkerId,
                savedBlueMarkerId,

            };
            console.log(sessionData)
            saveSession(sessionData, photo);

        }
    };

    async function saveSession(session, file) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Токен не найден в localStorage');
            return;
        }
    
        const formData = new FormData();
    
        // Используйте уже отформатированные данные
        Object.keys(session).forEach(key => {
            if (session[key] !== null && session[key] !== undefined) {
                formData.append(key, session[key]);
            }
        });
    
        if (file) {
            formData.append('photo', file);
        }
    
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
                console.log(formData)
                console.error('Ошибка при сохранении данных:', errorData);
                return;
            }
    
            const result = await response.json();
            console.log('Данные успешно сохранены:', result);
            window.location.href = `/account?token=${token}`
        } catch (error) {
            console.error('Ошибка при запросе:', error);
        }
    }
    
    
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
           
                <Typography variant='h1' sx={{ my: 4, textAlign: 'center' }}>Дополнительная информация</Typography>
                <Typography sx={{ mb: 4, textAlign: 'center', mb: 8 }}>
                    Чем больше данных предоставите - тем выше вероятность найти совпадение
                </Typography>

                <form onSubmit={handleSubmit}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', mb: 4 }}>
                        <Typography sx={{ mb: 2, textAlign: 'center' }}>
                            Введите <b>Имя</b> человека, которого вы ищете
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label="Имя"
                            variant="outlined"
                            sx={{ bgcolor: 'background.paper', input: { color: 'text.primary' } }}
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', mb: 6 }}>
                        <Typography sx={{ mb: 2, textAlign: 'center' }}>
                            Выберите <b>Пол</b> человека, которого вы ищете
                        </Typography>
                        <FormControl component="fieldset" error={!!errors.gender}>
                            <FormLabel component="legend">Пол</FormLabel>
                            <RadioGroup
                                aria-labelledby="gender-radio-group"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                name="gender-radio-group"
                            >
                                <FormControlLabel value="women" control={<Radio />} label="Женщина" />
                                <FormControlLabel value="men" control={<Radio />} label="Мужчина" />
                              
                            </RadioGroup>
                            {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                        </FormControl>
                    </Box>

                    <Typography variant='h6' sx={{mb:6}}>Укажите точную дату и время ИЛИ диапазоны дат и времени</Typography>

                    <Box sx={{ width: '100%', maxWidth: '800px', mb: 6 }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ mb: 1, textAlign: 'left' }}>
                                        Выберите <b>Дату</b>, когда вы видели этого человека (если помните)
                                    </Typography>
                                    <DataField value={date} onChange={setDate}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                                {/* <Typography variant="h4" >ИЛИ</Typography> */}
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ mb: 2, textAlign: 'left' }}>
                                        Укажите <b>Диапазон</b> дат, когда вы видели этого человека
                                    </Typography>
                                    <DateRange
                                   
                                    startDate={startDate} 
                                    endDate={endDate}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        {errors.date && <Typography color="error" align="center">{errors.date}</Typography>}
                    </Box>

                    <Box sx={{ width: '100%', maxWidth: '800px', mb: 6 }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ mb: 2, textAlign: 'left' }}>
                                        Укажите <b>Время</b>, когда вы видели этого человека (если помните)
                                    </Typography>
                                    <TimeField value={time} onChange={setTime} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                                {/* <Typography variant="h4">ИЛИ</Typography> */}
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography sx={{ mb: 2, textAlign: 'left' }}>
                                        Укажите <b>Диапазон</b> времени, когда вы видели этого человека
                                    </Typography>
                                    <TimeRange     
                                    startTime={startTime} 
                                    endTime={endTime}
                                    setStartTime={setStartTime}
                                    setEndTime={setEndTime} />
                                </Box>
                            </Grid>
                        </Grid>
                        {errors.time && <Typography color="error" align="center">{errors.time}</Typography>}
                    </Box>

                </Box>

                <Box sx={{ mt: 4, display: 'flex',flexDirection:'column',  justifyContent: 'center' }}>
                    <Typography variant="h2" sx={{ my: 4, textAlign: 'center' }}>Еще больше параметров!</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', mb: 6 }}>
                                <Typography sx={{ mb: 2, textAlign: 'center' }}>
                                    Введите <b>Фамилию</b> человека, которого вы ищете
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    label="Фамилия"
                                    variant="outlined"
                                    sx={{ bgcolor: 'background.paper', input: { color: 'text.primary' } }}
                                    fullWidth
                                    value={surname || ''} 
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', mb: 2 }}>
                                <Typography sx={{ mb: 2, textAlign: 'center' }}>
                                    Добавьте <b>Фото</b> человека, которого вы ищете
                                </Typography>
                            </Box>
                            <Upload 
                            onFileChange={handleFileChange} 
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', my: 6 }}>
                                <Typography sx={{ mb: 2, textAlign: 'center' }}>
                                    Введите <b>Особенности</b> человека, которого вы ищете
                                     (Например: светлые волосы , нос картошкой , родинка на шее)
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    label="Особенности"
                                    variant="outlined"
                                    sx={{ bgcolor: 'background.paper', input: { color: 'text.primary' } }}
                                    fullWidth
                                    value={more_info || ''} 
                                    onChange={(e) => setMore_info(e.target.value)} 
                                />
                            </Box>
                            <ButtonUsage content='Отправить' type='submit'/>
                        </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', }}>

                    <BaseTimeline/>
                </Box>
                </form>
                
            </Container>
        
        </ThemeProvider>
    );
}