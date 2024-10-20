import {
    WEBSOCKET_OPEN,
    WEBSOCKET_CLOSE,
    WEBSOCKET_MESSAGE_RECEIVED, 
    UPDATE_COUNT,
  UPDATE_MAYBE_MATCHES, REMOVE_MATCH
  } from '../actions/webSocketActions';
  
  const initialState = {
    isConnected: false,
    messages: [], 
    count: 0,
    matches: [] ,
  };
  
  const websocketReducer = (state = initialState, action) => {
    switch (action.type) {
      case WEBSOCKET_OPEN:
        return {
          ...state,
          isConnected: true
        };
  
      case WEBSOCKET_CLOSE:
        return {
          ...state,
          isConnected: false
        };
  
    case WEBSOCKET_MESSAGE_RECEIVED:
        const { matches = [] } = action.payload || {}; 
        return {
            ...state,
            matches,
        };
  
    case UPDATE_COUNT: 
      return {
        ...state,
        count: action.payload
      };

    case UPDATE_MAYBE_MATCHES: 
      return {
        ...state,
        matches: action.payload
      };

    case REMOVE_MATCH:
        return{
        ...state, 
        matches: state.matches.filter(match => match.maybematch.id !== action.payload),
    }
      default:
        return state;


    }
  };
  
  export default websocketReducer;