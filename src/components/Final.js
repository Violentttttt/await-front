import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CircularProgress, Container, Typography , Box} from '@mui/material';
import api from '../dead/api';
import Cube from '../animations/cube';

const LazyMatchList = lazy(() => import('../lazy-components/MatchList')); 

export default function Final() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const[nothing , setNothing] = useState(false)

  useEffect(() => {
    api.get(`${process.env.REACT_APP_API_URL}/api/v1/match/`, {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        setMatches(response.data);
        setLoading(false);
        
        // Проверяем, есть ли совпадения

          setNothing(false);

      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setNothing(true); // Вы можете установить это состояние в true, если произошла ошибка
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 12, mb: 8, textAlign: 'center', fontWeight: 'bold' }}>Match</Typography>
      {nothing?<Typography variant='h3'sx={{ mt: 12, mb: 8, textAlign: 'center', fontWeight: 'bold' }}>У вас пока нет совпадений
      </Typography>:<></>}
      {/* Показываем индикатор загрузки, пока данные не пришли */}
      {loading ? (
        <Box 
        sx={{
          position: 'fixed',   
          top: '50%',          
          left: '50%',         
          transform: 'translate(-50%, -50%)', 
          zIndex: 9999         
        }}
      >
          <Cube />
      </Box>
      ) : (
        <Suspense fallback={<Cube />}>
          <LazyMatchList matches={matches} />  {/* Ленивый рендер матчей */}
        </Suspense>
      )}
    </Container>
  );
}