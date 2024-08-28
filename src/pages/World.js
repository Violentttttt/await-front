import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import SidePanel from "../components/SidePanel";

import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css"; // Ensure CSS is imported

const World = () => {
  const [markerType, setMarkerType] = useState("red");
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/timurkononov/cly7sd5t400sw01nzawsmfchr"
  );
  const [language, setLanguage] = useState("en");
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const myLocation = useRef(null);
  const targetLocation = useRef(null);

  
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
      localStorage.setItem('authToken', token);
  }
  }, []);

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

      // const languageControl = new MapboxLanguage({ defaultLanguage: language });
      // mapRef.current.addControl(languageControl);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [mapStyle]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     const languageControl = new MapboxLanguage({ defaultLanguage: language });
  //     mapRef.current.addControl(languageControl);
  //   }
  // }, [language]);

  useEffect(() => {
    const handleMapClick = (e) => {
      const [longitude, latitude] = [e.lngLat.lng, e.lngLat.lat];
      if (markerType === "red") {
        if (myLocation.current) {
          myLocation.current.remove();
        }
        const marker = new mapboxgl.Marker({ color: "#FF0000" }) // Red marker
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        myLocation.current = marker;
        localStorage.setItem('red_marker_id', marker.id);
        console.log(
          `Red Marker: Longitude: ${longitude}, Latitude: ${latitude}`
        );
      } else if (markerType === "blue") {
        if (targetLocation.current) {
          targetLocation.current.remove();
        }
        const marker = new mapboxgl.Marker({ color: "#0000FF" }) // Blue marker
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);
        targetLocation.current = marker;
        localStorage.setItem('blue_marker_id', marker.id);
        console.log(
          `Blue Marker: Longitude: ${longitude}, Latitude: ${latitude}`
        );
      } else {
        alert("Выберите режим установки метки.");
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

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleSendData = () => {
    const data = {
      myLocation: myLocation.current ? myLocation.current.getLngLat() : null,
      targetLocation: targetLocation.current
        ? targetLocation.current.getLngLat()
        : null,
    };
    console.log(data);
    saveLocations(data);
  };

  const handleMarkerTypeChange = (type) => {
    setMarkerType(type);
    console.log(`Marker type changed to: ${type}`);
  };
 
  async function saveLocations(locations) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Токен не найден в localStorage');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/save_locations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`  // Отправляем токен в заголовке
            },
            body: JSON.stringify(locations)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка при сохранении координат:', errorData);
            return;
        }

        const result = await response.json();
      
        console.log('Данные успешно сохранены:', result);

        const redMarkerId = result.data.red_marker_id;
        const blueMarkerId = result.data.blue_marker_id;
       
      
        window.location.href = `/params?token=${token}&savedRedMarkerId=${redMarkerId}&savedBlueMarkerId=${blueMarkerId}`;
        return result;

    } catch (error) {
        console.error('Ошибка при запросе:', error);
    }
}


  
  return (
    <div style={{ display: "flex" }}>
      <SidePanel
        switchLanguage={switchLanguage}
        setMarkerType={handleMarkerTypeChange}
        handleSendData={handleSendData}
      />
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  );
};

export default World;
