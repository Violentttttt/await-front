import React, { useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordComponent(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputRef = useRef(null); // Создаем ref для поля ввода

    const handleClickShowPassword = () => {
        const input = inputRef.current; // Получаем элемент поля ввода через реф
        const cursorPosition = input.selectionStart; // Сохраняем позицию курсора

        setShowPassword(!showPassword); // Переключаем видимость пароля

        // Задержка для корректного отображения нового состояния и установки позиции курсора
        setTimeout(() => {
            input.setSelectionRange(cursorPosition, cursorPosition); // Восстанавливаем позицию курсора
        }, 0);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault(); // Предотвращаем потерю фокуса при нажатии
    };

    return (
        <TextField
            inputRef={inputRef} // Присваиваем реф к полю ввода
            label={props.label}
            variant="outlined"
            name={props.name}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={props.value}
            sx={{ my: 1 }}
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
    );
}
