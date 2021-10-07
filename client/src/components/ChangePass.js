import React, {useEffect, useState} from 'react'
import axios from './axios'

function ChangePass() {
  const token = localStorage.getItem('auth-token')
  const [newPass, setNewPass] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=> {
    setSuccess(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    changePassword()
    setSuccess(true)
  }

  const changePassword = async() => {
    await axios.post('/api/change-pass',{
      newPassword: newPass,
      token: token
    }).then((res)=> {
      if(res.data.status === 'ok'){
        setError(res.data.message)
        setNewPass('')
      } else {
        console.log(res)
        setError(res.data.error)
      }
    })
    .catch((err)=> console.log(err))
  }

  return (
    <div className="changePass">
      <h1>Change Password</h1>
      {success && <p className="errorText">{error}</p>}
      <form className="formClass" onSubmit={(e)=> handleSubmit(e)}>
        <input placeholder="new password" type="text" value={newPass} onChange={(e)=>setNewPass(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default ChangePass
