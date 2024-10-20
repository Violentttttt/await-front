import React, { useEffect } from 'react';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; // useLocation внутри Router
import World from './pages/World';
import Params from './pages/Params';
import Mui from './pages/Mui';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Geolocation from "./pages/Geolocation";
import ProtectedRoute from "./dead/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';
import { HelpProvider } from './context/HelpContext';
import WebSocketProvider from './dead/WebSocketProvider';

import { useDispatch } from 'react-redux';
import { connectWebSocket, disconnectWebSocket } from './actions/webSocketActions';
import { initializeMap } from './actions/mapActions';
import { history } from './dead/history';
import Cube from './animations/cube'


const App = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(connectWebSocket())
        dispatch(initializeMap("hiddenMapContainer"))
        // return ()=>{dispatch(disconnectWebSocket())}
    }, [dispatch])


    return( 
        <React.StrictMode>
            <HelpProvider>
  
                <HistoryRouter history={history}>
                <div id="hiddenMapContainer" style={{ width: "0", height: "0", visibility: "hidden" }}></div>
                        <Routes>
                            <Route path="/geo" element={<Geolocation />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/world" element={<AuthProvider><ProtectedRoute><World /></ProtectedRoute></AuthProvider>} />
                            <Route path="/params" element={<AuthProvider><ProtectedRoute><Params /></ProtectedRoute></AuthProvider>} />
                            <Route path="/mui" element={<Mui />} />
                            <Route path="/account" element={
                                <AuthProvider>    
                                    <ProtectedRoute>
                                            <Account />
                                    </ProtectedRoute>
                                </AuthProvider>
                            } />


                            <Route path="/" element={<Cube />} />
                        </Routes>
                </HistoryRouter>

            </HelpProvider>
        </React.StrictMode>
    ); 
}

export default App;