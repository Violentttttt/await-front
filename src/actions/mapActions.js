import mapboxgl from 'mapbox-gl';

export const INITIALIZE_MAP = 'INITIALIZE_MAP';

export const initializeMap = (containerId) => async (dispatch) => {
    const container = document.getElementById(containerId);
  
    if (!container) {
      console.error('Контейнер для карты не найден');
      return;
    }
  
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  
    const map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/timurkononov/cly7sd5t400sw01nzawsmfchr',
      center: [12.89, 0.98],
      zoom: 2.9,
      projection: 'globe',
      attributionControl: false,
    });
  
    map.on("load", () => {
      console.log('Карта успешно загружена');
      dispatch({
        type: 'INITIALIZE_MAP',
        payload: map,
      });
    });
  };
  

export const moveMapToContainer = (newContainerId) => (dispatch, getState) => {
    const { map } = getState().map;
  
    if (map) {
      const newContainer = document.getElementById(newContainerId);
  
      if (!newContainer) {
        console.error('Новый контейнер для карты не найден');
        return;
      }
  
      map.getContainer().style.visibility = 'hidden';  
      newContainer.style.visibility = 'visible';  
      map.resize(); 
    }
  };