import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connectWebSocket } from '../actions/webSocketActions';

const WebSocketProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectWebSocket());


    }, [dispatch]);

    return <>{children}</>;
};

export default WebSocketProvider;