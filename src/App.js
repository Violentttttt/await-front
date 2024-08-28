import React, { useEffect } from 'react'; 
import axios from 'axios'; 
import World from './pages/World';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Params from './pages/Params';
import Mui from './pages/Mui';
import Account from './pages/Account';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

class App extends React.Component { 
  
	state = { 
		details : [], 
	} 

	componentDidMount() { 

		let data ; 

		axios.get('http://localhost:8000/api/v1/world/') 
		.then(res => { 
			data = res.data; 
			this.setState({ 
				details : data	 
			}); 
		}) 
		.catch(err => {}) 
	} 

render() { 
	return( 
    <React.StrictMode>
    <Router>
    <div>
        <Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/logout" component={<Logout/>} />
            <Route path="/world" element={<World />} />
            <Route path="/params" element={<Params />} />
			<Route path="/account" element={<Account />} />
            <Route path="/mui" element={<Mui />} />
        </Routes>
    </div>
</Router>
</React.StrictMode>
	); 
} 
} 


export default App;
