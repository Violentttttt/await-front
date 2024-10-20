import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Divider } from '@mui/material';


function MatchList({ matches }) {
  return (
    <Grid container spacing={4}>
      {matches.map(match => (
        <Grid item xs={12} sm={6} md={4} key={match.id}>
          <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              sx={{ height: 200, objectFit: 'cover' }}
              image={`https://robohash.org/${match.user_2.real_name}`}
              alt="Session 1"
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h2" color="primary" sx={{ mb: 2 }}>
                Детали
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Пользователь 1:</strong> {match.user_1.real_name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Пользователь 2:</strong> {match.user_2.real_name}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}></Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default MatchList;