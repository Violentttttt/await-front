import React, { useEffect } from "react"
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from "../components/Theme";
import { pickersArrowSwitcherClasses } from "@mui/x-date-pickers/internals";
import ButtonUsage from "../components/ButtonUsage";
import PasswordComponent from "../components/PasswordComponent";
import axios from "axios";

//не хватает норм валидации и аксиосов , также рассмотреть эту страгницу как попап . проработать авторизацию в API

export default function Login(){

const[formData, setFormData] = React.useState({email:'', password:'' })
const [showPassword, setShowPassword] = React.useState(false);
const[ errors , setErrors] = React.useState({})
const [token, setToken] = React.useState(null);


const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

function handleChange(event){
    const {name, value , type , checked} = event.target
setFormData((prev)=>({...prev , [name]:value}))
}

async function handleSubmit(event){
    event.preventDefault();
    if (validate()){
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login/`, formData);
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token);
        
    } catch (error) {
        alert('Error during login');
    }
    
}
}

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = `/account?token=${token}`;
    }
}, [token]);


const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Это поле обязательно";
    tempErrors.password = formData.password ? "" : "Введите пароль";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
};
return(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
       
        <Container>
            <Typography variant="h1" sx={{textAlign:"center" , my:5}}>Войти</Typography>
            <Box sx={{display:"flex" , flexDirection:"column"}}>
                <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    type="email"
                    name="email"
                    label="Введите почту"
                    variant="outlined"
                    sx={{ bgcolor: 'background.paper', input: { color: 'text.primary' } }}
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />

            <PasswordComponent 
                name={'password'} 
                label={'Введите пароль'} 
                value={formData.password} 
                handleChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
            />
                <ButtonUsage content={'Войти'} type={'submit'}/>
                </form>
            </Box>
        </Container>

    </ThemeProvider>
)
}