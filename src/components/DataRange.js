import * as React from 'react';
import dayjs from 'dayjs';
import { Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRange({startDate , endDate , setStartDate , setEndDate}) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',  // Центрируем по вертикали
          justifyContent: 'space-between',
          gap: 4,
       
        }}>
        <DatePicker
          label="Начало"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Конец"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
