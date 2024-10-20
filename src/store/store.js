import { applyMiddleware, createStore, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import websocketReducer from '../reducers/webSocketReducer'; // ваш редуктор WebSocket
import { routerMiddleware, routerReducer, createReduxHistory } from '../dead/history'; // импорты из истории
import webSocketMiddleware from '../middlwware/webSocketMiddleware'; 
import mapReducer from '../reducers/mapReducer';

// Комбинируем редукторы
const rootReducer = combineReducers({
  websocket: websocketReducer,
  router: routerReducer, 
  map: mapReducer
});


// Создание store с middleware маршрутизации и WebSocket
const store = createStore(
  rootReducer,

  composeWithDevTools(
    applyMiddleware(routerMiddleware, thunk, webSocketMiddleware)
  )
);

// Экспортируем Redux-историю
export const history = createReduxHistory(store);

export default store;