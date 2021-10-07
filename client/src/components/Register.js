import React, {useState} from 'react'
import axios from './axios'
import { useHistory } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    registerForm()
  }

  const registerForm = async() => {
    await axios.post('/api/register', {
      username: username,
      password: password,
      email: email
    })
    .then(res =>{
      if(res.data.status === 'ok'){
        setUsername('')
        setPassword('')
        setEmail('')
        history.push("/login");
        console.log(res.data.message)
      } else {
        setError(res.data.error)
      }
      
    })
    .catch(err => setError(err.response.data.error))
  }

  return (
    <div className="register">
      <h1>Register</h1>
      {error && <p className="errorText">{error}</p>}
      <form className="formClass" onSubmit={e => handleSubmit(e)}>
        <input value={username} placeholder="username" type="text" onChange={e => (setUsername(e.target.value))} />
        <input value={password} placeholder="password" type="password" onChange={e => (setPassword(e.target.value))}/>
        <input value={email} placeholder="email" type="email" onChange={e => (setEmail(e.target.value))}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default Register
