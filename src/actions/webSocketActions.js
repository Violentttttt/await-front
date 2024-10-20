export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET_DISCONNECT';
export const WEBSOCKET_SEND_MESSAGE = 'WEBSOCKET_SEND_MESSAGE';
export const WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';
export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const WEBSOCKET_CLOSE = 'WEBSOCKET_CLOSE';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_MAYBE_MATCHES = 'UPDATE_MAYBE_MATCHES';
export const REMOVE_MATCH = 'REMOVE_MATCH';

export const connectWebSocket = () => ({
  type: WEBSOCKET_CONNECT
});

export const disconnectWebSocket = () => ({
  type: WEBSOCKET_DISCONNECT
});

export const sendMessage = (message) => ({
  type: WEBSOCKET_SEND_MESSAGE,
  payload: message
});

export const messageReceived = (message) => ({
  type: WEBSOCKET_MESSAGE_RECEIVED,
  payload: message
});


export const updateCount = (count) => ({
  type: UPDATE_COUNT,
  payload: count,
});

export const updateMayBeMatches = (matches) => ({
  type: UPDATE_MAYBE_MATCHES,
  payload: matches,
});

export const removeMatch = (matchId) => ({
    type: REMOVE_MATCH,
    payload: matchId,
  });