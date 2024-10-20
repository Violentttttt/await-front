import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'; 
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import CloseIcon from '@mui/icons-material/Close'; 
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, keyframes } from '@mui/material/styles';
import { useMediaQuery, Tooltip, Fade, Backdrop } from '@mui/material';

export default function BottomNav({ onChange }) {
  const count = useSelector((state) => state.websocket.count);
  const [value, setValue] = React.useState('recents');
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fadeInUp = keyframes`
    0% {
      opacity: 0;
      transform: translateY(30%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsMoreOpen(newValue === 'more' ? !isMoreOpen : false);
    if (onChange) onChange(newValue);
  };

  const handleMoreAction = (newValue) => {
    setValue(newValue);
    setIsMoreOpen(false);
    if (onChange) onChange(newValue);
  };

  React.useEffect(() => {
    if (!isSmallScreen) {
      setIsMoreOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 10 }}>
      {!isSmallScreen ? (
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          
            <BottomNavigationAction label="Найти" value="find" icon={<TravelExploreOutlinedIcon />} disableRipple />
         
       
            <BottomNavigationAction label="История" value="history" icon={<FmdGoodOutlinedIcon />} disableRipple />
    
          <BottomNavigationAction
            disableRipple
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
                      backgroundColor: '#7FFF00',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}
                  >
                    {count}
                  </Box>
                )}
              </Box>
            }
          />

            <BottomNavigationAction label="Баланс" value="balance" icon={<AccountBalanceWalletOutlinedIcon />} disableRipple />

            <BottomNavigationAction label="Профиль" value="profile" icon={<AccountCircleOutlinedIcon />} disableRipple />


            <BottomNavigationAction label="Log Out" value="logout" icon={<ExitToAppOutlinedIcon />} disableRipple />

        </BottomNavigation>
      ) : (
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          <BottomNavigationAction label="Найти" value="find" icon={<TravelExploreOutlinedIcon />} disableRipple />
          <BottomNavigationAction
            disableRipple
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
                      backgroundColor: '#7FFF00',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}
                  >
                    {count}
                  </Box>
                )}
              </Box>
            }
          />
          <BottomNavigationAction label="Профиль" value="profile" icon={<AccountCircleOutlinedIcon />} disableRipple />
          <BottomNavigationAction
            label="Ещё"
            value="more"
            icon={isMoreOpen ? <CloseIcon /> : <MoreHorizIcon />}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            disableRipple
          />
        </BottomNavigation>
      )}

      {isMoreOpen && (
        <>
          {/* Добавляем Backdrop для затемнения фона */}
          <Backdrop open={isMoreOpen} sx={{ zIndex: 9 }} />
          <Fade in={isMoreOpen}>
            <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 10 }}>
              <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction label="Найти" value="find" icon={<TravelExploreOutlinedIcon />} disableRipple />
                <BottomNavigationAction
                  disableRipple
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
                            backgroundColor: '#7FFF00',
                            color: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                          }}
                        >
                          {count}
                        </Box>
                      )}
                    </Box>
                  }
                />
                <BottomNavigationAction label="Профиль" value="profile" icon={<AccountCircleOutlinedIcon />} disableRipple />
                <BottomNavigationAction
                  label="Ещё"
                  value="more"
                  icon={isMoreOpen ? <CloseIcon /> : <MoreHorizIcon />}
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  disableRipple
                />
              </BottomNavigation>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '60px',
                  left: 0,
                  width: '100%',
                  bgcolor: 'background.paper',
                  color: '#fff',
                  boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.5)',
                  zIndex: 11,
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      width: '100%',
                      animation: `${fadeInUp} 0.3s ease-in-out`,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)',  borderRadius:2 },
                    }}
                    onClick={() => handleMoreAction('history')}
                  >
                    <FmdGoodOutlinedIcon sx={{ marginRight: '16px' }} />
                    <span>История</span>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      width: '100%',
                      animation: `${fadeInUp} 0.4s ease-in-out`,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' ,  borderRadius:2},
                    }}
                    onClick={() => handleMoreAction('balance')}
                  >
                    <AccountBalanceWalletOutlinedIcon sx={{ marginRight: '16px' }} />
                    <span>Баланс</span>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      width: '100%',
                      animation: `${fadeInUp} 0.5s ease-in-out`,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' ,  borderRadius:2},
                    }}
                    onClick={() => handleMoreAction('logout')}
                  >
                    <ExitToAppOutlinedIcon sx={{ marginRight: '16px' }} />
                    <span>Log Out</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Fade>
        </>
      )}
    </Box>
  );
}