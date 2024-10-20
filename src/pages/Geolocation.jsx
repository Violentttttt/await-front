import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css"; 
import GeoComponent from '../components/GeoComponent';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Geolocation = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geolocateControl = useRef(null);
  const [lng, setLng] = useState(37.6173);  // долгота по умолчанию
  const [lat, setLat] = useState(55.7558);  // широта по умолчанию
  const [zoom, setZoom] = useState(9);
  const markerRef = useRef(null);  // Реф для маркера
  const wsRef = useRef(null);
  const [isTracking, setIsTracking] = useState(false);

//////////////////////
const sendLocation = () => {
  if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
    wsRef.current.send(JSON.stringify({
      longitude: lng,
      latitude: lat,
    }));
    console.log(`Sent location: ${lng}, ${lat}`); // Лог отправленных координат
  } else {
    console.error("Websocket еще не открыт - жди блять");
  }
};

// Используем useEffect для WebSocket
useEffect(() => {
  if (isTracking) {
    // Инициализация WebSocket
    wsRef.current = new WebSocket('ws://localhost:8000/ws/location/');

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established');
      sendLocation(); // Отправляем координаты сразу после открытия соединения
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`Received location: ${data.longitude}, ${data.latitude}`);
      // Здесь можно обновить маркер или что-то другое
    };

    // Очистка WebSocket при размонтировании компонента или отключении отслеживания
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }
}, [isTracking]); // Подключение будет происходить при изменении isTracking

useEffect(() => {
  // Отправляем данные о геолокации, когда они меняются
  if (isTracking){
    sendLocation();
  }

}, [lng, lat , isTracking]);

//////////////////////



  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/timurkononov/cly7sd5t400sw01nzawsmfchr',
        center: [lng, lat],
        zoom: zoom,
        projection: "globe",
        attributionControl: false,
      });

      map.current.on('load', () => {
 
        geolocateControl.current = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });

        map.current.addControl(geolocateControl.current);

        geolocateControl.current.on('geolocate', (event) => {
          const { longitude, latitude } = event.coords;
// отладка
          // console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
          setLng(longitude);
          setLat(latitude);


          if (markerRef.current) {
            markerRef.current.setLngLat([longitude, latitude]);
          } else {
            markerRef.current = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          }

          map.current.flyTo({ center: [longitude, latitude], zoom: 12 });
        });
      });
    }
  }, []);

  useEffect(() => {
    if (isTracking) {
      geolocateControl.current?.trigger(); // Включаем отслеживание
    } else {
      if (markerRef.current) {
        markerRef.current.remove(); // Удаляем маркер
        markerRef.current = null;
      }

      if (geolocateControl.current) {
        // Полностью удаляем GeolocateControl, чтобы остановить отслеживание
        map.current.removeControl(geolocateControl.current);
        geolocateControl.current = null;
        
        // При необходимости можно заново добавить GeolocateControl
        geolocateControl.current = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: false,
          showUserHeading: false
        });
        map.current.addControl(geolocateControl.current);
      }
    }
  }, [isTracking]);

  return (
    <div>
        <GeoComponent setTracking={setIsTracking}/>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Geolocation;

