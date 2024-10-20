import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_SEND_MESSAGE,
    WEBSOCKET_OPEN,
    WEBSOCKET_CLOSE,
    updateCount,
    updateMayBeMatches,
} from '../actions/webSocketActions';
import api from '../dead/api';

let socket = null;

const webSocketMiddleware = (store) => (next) => async (action) => {
    const state = store.getState();
    const { pathname } = state.router?.location || {}; // Добавьте проверку на null
if (!pathname) {
    console.warn('Pathname is not available yet');
    return next(action); // Пропускаем действие, если маршрутизация не инициализирована
}

    switch (action.type) {
        case WEBSOCKET_CONNECT:
            // Проверяем, что мы не на страницах логина или регистрации
            if (pathname === '/login' || pathname === '/register') {
                return next(action);
            }

            // Проверяем, что WebSocket не уже подключен
            if (socket !== null) {
                return next(action); // Если соединение уже установлено, не делаем повторное подключение
            }

            try {
                const response = await api.get(`${process.env.REACT_APP_API_URL}/api/v1/wstoken`, {
                    withCredentials: true,
                });
                const token = response.data;

                socket = new WebSocket('ws://localhost:8000/ws/maybematch/');

                socket.onopen = () => {
                    store.dispatch({ type: WEBSOCKET_OPEN });
                    socket.send(JSON.stringify({ type: 'authenticate', token }));
                };

                socket.onclose = (event) => {
                    store.dispatch({ type: WEBSOCKET_CLOSE });
                    socket = null; // Обнуляем сокет
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch(updateCount(data.count));
                    store.dispatch(updateMayBeMatches(data.matches));
                };

            } catch (error) {
                console.error('Ошибка при подключении WebSocket или получении токена:', error);
            }

            break;

        case WEBSOCKET_DISCONNECT:
            if (socket !== null) {
                socket.onclose = null; // Отключаем обработчик, чтобы избежать перезапуска соединения
                socket.close(); // Закрываем соединение явно
            }
            socket = null;
            break;

        case WEBSOCKET_SEND_MESSAGE:
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(action.payload));
            } else {
                console.warn('Попытка отправить сообщение через закрытое соединение');
            }
            break;

        default:
            break;
    }

    return next(action);
};

export default webSocketMiddleware;