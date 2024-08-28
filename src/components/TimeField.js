import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function TimeField({ value, onChange }) {

  // Обработчик изменения времени
  const handleTimeChange = (newTime) => {
    onChange(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',  // Центрируем по вертикали
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Компонент TimePicker для выбора времени */}
        <Box sx={{ flex: 1 }}>
          <TimePicker
            value={value} 
            onChange={handleTimeChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
            ampm={false} 
          />
        </Box>

        {/* Компонент для отображения выбранного времени */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h7">Выбранное время:</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {value ? value.format('HH:mm') : 'Не выбрано'}
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
