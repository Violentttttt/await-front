import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { pickersArrowSwitcherClasses } from "@mui/x-date-pickers/internals";
import React from "react";
import theme from "../components/Theme";
import ButtonUsage from "../components/ButtonUsage";
import PasswordComponent from "../components/PasswordComponent";


//не сделал логику сравнения паролей , также более строгая валидация
export default function Register(){
const[formData , setFormData] = React.useState({email:'', username:'', real_name:'' , age:null , password:'' , passwordRepeat:''})
const[ errors , setErrors] = React.useState({})


function handleChange(event){
const{name, value, type, checked} = event.target
setFormData((prev)=>({...prev ,[name]:value}))
}

function handleSubmit(event){
    event.preventDefault();
    if(validate()){
    console.log(formData)}
}

const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Это поле обязательно";
    tempErrors.username = formData.username ? "": "Это поле обязательно"
    tempErrors.real_name = formData.real_name ? "": "Это поле обязательно"
    tempErrors.age = formData.age ? "": "Это поле обязательно"
    tempErrors.password = formData.password ? "" : "Введите пароль";
    tempErrors.repeatPassword = formData.repeatPassword ? "" : "Повторите придуманный пароль";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
};


    return(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container>
            <form onSubmit={handleSubmit}>
            <Box sx={{textAlign:'center' , my:2}}>
                <Typography variant="h1">Регистрация</Typography>
                <TextField
                    name="email"
                    type="email"
                    value={formData.email}
                    fullWidth
                    sx={{my:2}}
                    label='Введите почту'
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    name="username"
                    type="text"
                    value={formData.username}
                    fullWidth
                    sx={{my:2}}
                    label='Придумайте псевдоним(username)'
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    name="real_name"
                    type="text"
                    value={formData.real_name}
                    fullWidth
                    sx={{my:2}}
                    label='Введите свое настоящее имя'
                    onChange={handleChange}
                    error={!!errors.real_name}
                    helperText={errors.real_name}
                />
                <TextField
                    name="age"
                    type=""//забыл тип 
                    value={formData.age}
                    fullWidth
                    sx={{my:2}}
                    label='Введите свой настоящий возраст'
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                />
            <PasswordComponent 
                name={'password'} 
                label={'Придумайте пароль'} 
                value={formData.password} 
                handleChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
            />
            <PasswordComponent 
                name={'passwordRepeat'} 
                label={'Повторите пароль'} 
                value={formData.passwordRepeat} 
                handleChange={handleChange}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword}
            />
                <ButtonUsage type={'submit'} content={'Создать'} />
            </Box>
            
            </form>
        </Container>
    </ThemeProvider>
    )
}