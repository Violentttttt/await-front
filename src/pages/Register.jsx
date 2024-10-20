import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from "react";
import theme from "../components/Theme";
import ButtonUsage from "../components/ButtonUsage";
import PasswordComponent from "../components/PasswordComponent";
import axios from "axios";
import { red } from "@mui/material/colors";
import { HelpProvider , HelpContext , useHelp} from '../context/HelpContext';
import { useNavigate } from "react-router-dom";

//не сделал логику сравнения паролей , также более строгая валидация
export default function Register(){
const[formData , setFormData] = React.useState({email:'', username:'', real_name:'' , gender:'' ,age:'' , password:'' , passwordRepeat:''})
const[ errors , setErrors] = React.useState({})
const[exist , setExist] = React.useState(false)

const navigate = useNavigate()


function handleChange(event){
const{name, value, type, checked} = event.target
setFormData((prev)=>({...prev ,[name]:value}))
}


async function handleSubmit(event) {
    event.preventDefault();
      if (validate()) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/register/`, formData, { withCredentials: true });
          console.log(response);
          setExist(false); 

          sessionStorage.setItem('fromRegister', 'true');
          console.log(sessionStorage.getItem('fromRegister'))
          navigate('/login');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setExist(true); 
            console.log(exist)
          } else {
            alert('Error during registration');
          }
        }
      }
  }
  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Это поле обязательно";
    tempErrors.username = formData.username ? "" : "Это поле обязательно";
    tempErrors.real_name = formData.real_name ? "" : "Это поле обязательно";
    tempErrors.gender = formData.gender ? "" : "Выберите пол";


    if (!formData.age) {
        tempErrors.age = "Это поле обязательно";
    } else if (formData.age <= 0 || formData.age >= 100) {
        tempErrors.age = "Введите корректный возраст";
    } else {
        tempErrors.age = ""; 
    }

    tempErrors.password = formData.password ? "" : "Введите пароль";
    tempErrors.repeatPassword = formData.passwordRepeat !== formData.password ? "Пароли не совпадают" : "";
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

                <Typography
                sx={{
                    textAlign: "center",
                    my: { xs: 3, md: 5 }, 
                    color: "text.secondary",
                    px: { xs: 2, md: 0 },  
                }}
            >
                Уже есть аккаунт? {" "}
                <Box
                    component="a"
                    onClick={() => navigate('/login/')}
                    sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        textDecoration: "underline",
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.1rem" }, 
                        "&:hover": {
                            color: "primary.dark",
                            textDecoration: "none",
                        },
                        display: "inline-block",  
                    }}
                >
                    Войти
                </Box>
            </Typography>

                {exist?<Box>
                    <Typography variant="h3" sx={{color:"red"}}>
                        Такой пользователь уже существует
                    </Typography>
                </Box>:''}
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
                    label='Придумайте псевдоним (username)'
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
               <FormControl component="fieldset" error={!!errors.gender}>
             
                            <RadioGroup
              
                             sx={{display:'flex', flexDirection:'row', alignItems:'center'}}
                                aria-labelledby="gender-radio-group"
                                value={formData.gender}
                                onChange={handleChange}
                                name="gender"
                            >
                                <FormLabel component="legend" sx={{mx:2}}>Пол</FormLabel>
                                <FormControlLabel value="women" control={<Radio sx={{ color: !!errors.gender ? red[500] : 'inherit' }}/>} label="Женщина" sx={{ color: !!errors.gender ? red[500] : 'inherit' }}/>
                                <FormControlLabel value="men" control={<Radio sx={{ color: !!errors.gender ? red[500] : 'inherit' }}/>} label="Мужчина" sx={{ color: !!errors.gender ? red[500] : 'inherit' }}/>
                              
                            </RadioGroup>
                           
                </FormControl>
                <TextField
                    name="age"
                    type="number"
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