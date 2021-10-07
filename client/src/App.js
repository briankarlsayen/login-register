import './App.css';
import {useState, useEffect} from 'react'
import {
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import axios from './components/axios'
import ChangePass from './components/ChangePass';
function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState('')

  useEffect(()=>{
    const token = localStorage.getItem('auth-token')
    if(token){
      axios.defaults.headers.common['auth-token'] = token
      getData()
    }
  },[isLogged])

  const getData = async() => {
    await axios.get('/private')
    .then(res => {
      setIsLogged(true)
      setUser(res.data)
    })
    .catch((err)=>{
      console.log(err)
      setIsLogged(false)
    })
  }

  return (
    <div>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
      <Switch>
        <Route path="/login">
          <Login setIsLogged={setIsLogged} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/change-password">
          <ChangePass />
        </Route>
        <Route path="/">
          <Home isLogged={isLogged} user={user} /> 
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
