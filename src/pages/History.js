import { React, useState, useEffect, lazy, Suspense } from "react";
import { Box, Container, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import api from '../dead/api';
import HistoryCard from '../lazy-components/HistoryCard';
import Cube from '../animations/cube';

export default function History(){
    const LazyCard = lazy(() => import('../lazy-components/HistoryCard'))
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [loading, setLoading] = useState(true);
    const[ses, setSes] = useState([])
useEffect(()=>{
    api.get(`${process.env.REACT_APP_API_URL}/api/v1/history/`, {
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response.data);
          setSes(response.data)
        })
        .catch(function (error) {
          console.log(error);
          })
}, [])

useEffect(() => {
    
    if (ses.length > 0) {
        setLoading(false);
    } else {
        setLoading(true); 
    }
}, [ses]);

    return (
<Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h1' sx={{ fontWeight: "bold", my: 8 }}>История</Typography>


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
                    <Grid container spacing={2} justifyContent="center">
                    {ses && ses.map((i) => (
                        <Grid 
                        item 
                        key={i.id} 
                        xs={12} // На маленьком экране одна карточка занимает всю ширину
                        md={isLargeScreen ? 6 : 12} // На большом экране — две карточки в строку
                        >
                        <HistoryCard session={i} />
                        </Grid>
                    ))}
                    </Grid>
                </Suspense>
            )}


        
      </Box>
    </Container>
    )
}