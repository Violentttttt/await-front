import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useTheme } from '@mui/material/styles';

export default function MatchNav({ onChange }) {
  const [value, setValue] = React.useState('maybematch');
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box 
      sx={{
        width: '300px',  // Фиксированная ширина
        position: 'fixed',
        top: '15px',
        left: '50%',
        transform: 'translateX(-50%)',  // Центрирование
        zIndex: 10,
        backgroundColor: theme.palette.background.paper,  // Используем цвет из theme
        borderRadius: '20px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',  // Легкая тень
        padding: '5px',  // Внутренний отступ
      }}
    >
      <BottomNavigation 
        value={value} 
        onChange={handleChange} 
        showLabels
        sx={{
          backgroundColor: 'transparent',  // Прозрачный фон
          height: '40px',  // Небольшая высота
        }}
      >
        <BottomNavigationAction 
          label="MayBeMatch" 
          value="maybematch" 
          icon={<TravelExploreOutlinedIcon fontSize="small" />}  
          sx={{
            color: value === 'maybematch' 
              ? theme.palette.primary.main 
              : theme.palette.text.secondary,  // Цвета из theme
            '& .Mui-selected': {
              color: theme.palette.primary.main,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',  // Меньший размер шрифта
            },
          }}
        />
        <BottomNavigationAction 
          label="Match" 
          value="match" 
          icon={<MapOutlinedIcon fontSize="small" />}  
          sx={{
            color: value === 'match' 
              ? theme.palette.primary.main 
              : theme.palette.text.secondary,  // Цвета из theme
            '& .Mui-selected': {
              color: theme.palette.primary.main,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',  // Меньший размер шрифта
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
