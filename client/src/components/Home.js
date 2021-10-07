import React from 'react'

function Home({isLogged, user}) {
  
  return (
    <div className="home">
      {isLogged ?
      <h1>Welcome {user.username}</h1>
      : <h1>Secret</h1>
      }
      
    </div>
  )
}

export default Home
