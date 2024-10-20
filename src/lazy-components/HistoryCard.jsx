import React, { useEffect, useRef } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const parseLocation = (locationString) => {
    const match = locationString.match(/POINT \(([^)]+)\)/);
    if (match) {
      return match[1].split(' ').map(Number); // Преобразуем строку в координаты
    }
    return null;
  };
  


const HistoryCard = ({ session }) => {
  const mapContainerRef = useRef(null);
  const { red_marker, blue_marker, gender, name, created_at } = session;

  useEffect(() => {
    if (red_marker && blue_marker) {
      const redMarkerCoords = parseLocation(red_marker.location);
      const blueMarkerCoords = parseLocation(blue_marker.location);

      if (redMarkerCoords && blueMarkerCoords) {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/timurkononov/cly7sd5t400sw01nzawsmfchr", 
          center: [(redMarkerCoords[0] + blueMarkerCoords[0]) / 2, 
                   (redMarkerCoords[1] + blueMarkerCoords[1]) / 2], // Центр между двумя точками
          zoom: 5,
          attributionControl: false,
        });

        // Добавляем красный маркер
        new mapboxgl.Marker({ color: "red" })
          .setLngLat(redMarkerCoords)
          .addTo(map);

        // Добавляем синий маркер
        new mapboxgl.Marker({ color: "blue" })
          .setLngLat(blueMarkerCoords)
          .addTo(map);

        return () => map.remove();
      }
    }
  }, [red_marker, blue_marker]);

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
            {name&& 
            <Typography variant="body1">
                <strong>Имя:</strong> {name}
              </Typography>
              }
              <Typography variant="body1">
                <strong>Дата создания записи:</strong> {new Date(created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              ref={mapContainerRef}
              sx={{ height: "200px", width: "100%", borderRadius: 2, overflow: "hidden" }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;