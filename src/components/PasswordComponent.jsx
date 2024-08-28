import React from "react";
import { Box, Container, Typography, createTheme, ThemeProvider, CssBaseline, TextField, Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { pickersArrowSwitcherClasses } from "@mui/x-date-pickers/internals";
import IconButton from '@mui/material/IconButton';


export default function PasswordComponent(props){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    


    return(
        <TextField
                    label={props.label}
                    variant="outlined"
                    name={props.name}
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={props.value}
                    sx={{my:1}}
                    onChange={props.handleChange}
                    error={props.error}
                    helperText={props.helperText}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                />
    )
}