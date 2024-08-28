import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

export default function BottomNav({ onChange, count }) {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 10 }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Найти" value="find" icon={<TravelExploreOutlinedIcon />} />
        <BottomNavigationAction label="История" value="history" icon={<FmdGoodOutlinedIcon />} />
        <BottomNavigationAction 
          label="Мэтчи" 
          value="matches" 
          icon={
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <MapOutlinedIcon />
              {count > 0 && (
                <Box 
                  sx={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 15,
                    height: 15,
                    borderRadius: '30%',
                    backgroundColor: 'red',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </Box>
              )}
            </Box>
          }
        />
        <BottomNavigationAction label="Баланс" value="balance" icon={<AccountBalanceWalletOutlinedIcon />} />
        <BottomNavigationAction label="Профиль" value="profile" icon={<AccountCircleOutlinedIcon />} />
        <BottomNavigationAction label="Log Out" value="logout" />
      </BottomNavigation>
    </Box>
  );
}
