import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import SidePanel from "../components/SidePanel";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Ensure CSS is imported
import api from "../dead/api";
import { ThemeProvider } from "@emotion/react";
import theme from '../components/Theme'

const World = () => {
  const [markerType, setMarkerType] = useState("red");
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/timurkononov/cly7sd5t400sw01nzawsmfchr"
  );
  
  const [areMarkersSet, setAreMarkersSet] = useState(false); // Новое состояние для валидации
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const myLocation = useRef(null);
  const targetLocation = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [12.89, 0.98],
      zoom: 2.9,
      projection: "globe",
      attributionControl: false,
    });

    mapRef.current.on("style.load", () => {
      const container = mapRef.current.getContainer();
      const attribControl = container.querySelector(".mapboxgl-ctrl-attrib");
      if (attribControl) attribControl.style.display = "none";
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapStyle]);

  useEffect(() => {
    const handleMapClick = (e) => {
      const [longitude, latitude] = [e.lngLat.lng, e.lngLat.lat];
      if (markerType === "red") {
        if (myLocation.current) {
          myLocation.current.remove();
        }
        const marker = new mapboxgl.Marker({ color: "#FF0000" }) // Красный маркер
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        myLocation.current = marker;
        console.log(`Red Marker: Longitude: ${longitude}, Latitude: ${latitude}`);
      } else if (markerType === "blue") {
        if (targetLocation.current) {
          targetLocation.current.remove();
        }
        const marker = new mapboxgl.Marker({ color: "#0000FF" }) // Синий маркер
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        targetLocation.current = marker;
        console.log(`Blue Marker: Longitude: ${longitude}, Latitude: ${latitude}`);
      } else {
        alert("Выберите режим установки метки.");
      }

      // Проверяем, установлены ли оба маркера, и обновляем состояние
      if (myLocation.current && targetLocation.current) {
        setAreMarkersSet(true); // Оба маркера установлены, активируем кнопку
      }
    };

    if (mapRef.current) {
      mapRef.current.on("click", handleMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", handleMapClick);
      }
    };
  }, [markerType]);



  const handleSendData = () => {
    const data = {
      myLocation: myLocation.current ? myLocation.current.getLngLat() : null,
      targetLocation: targetLocation.current ? targetLocation.current.getLngLat() : null,
    };
    console.log(data);
    saveLocations(data);
  };

  async function saveLocations(locations) {
    try {
      const response = await api.post('http://127.0.0.1:8000/api/v1/save_locations/', locations, {
        withCredentials: true,
      });

      const result = response.data;

      console.log('Данные успешно сохранены:', result);

      window.location.href = `/params/`;
      return result;
    } catch (error) {
      console.error('Ошибка при запросе:', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <SidePanel
   
          setMarkerType={setMarkerType}
          handleSendData={handleSendData}
          isSendDataDisabled={!areMarkersSet} // Передаем флаг в SidePanel
        />
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "100vh" }}
        ></div>
      </div>
    </ThemeProvider>
  );
};

export default World;