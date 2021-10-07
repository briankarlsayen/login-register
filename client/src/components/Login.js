import React, {useState} from 'react'
import axios from './axios'
import { useHistory } from "react-router-dom";

function Login({setIsLogged}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    loginForm()
    
  }

  const loginForm = async() => {
    await axios.post('/api/login', {
      username: username,
      password: password
    })
    .then(res =>{
      //get token
      if(res.data.status === 'ok'){
        setUsername('')
        setPassword('')
        localStorage.setItem('auth-token', res.data.token)
        setIsLogged(true)
        history.push("/");
      }else {
        setError(res.data.error)
      }
    })
    .catch(err => {
      setError(err.response.data.error)
    })
  }

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <p className="errorText">{error}</p>}
      <form className="formClass" onSubmit={e => handleSubmit(e)}>
        <input value={username} placeholder="username" type="text" onChange={e => (setUsername(e.target.value))} />
        <input value={password} placeholder="password" type="password" onChange={e => (setPassword(e.target.value))}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
