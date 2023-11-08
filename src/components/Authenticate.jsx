import React from "react";
import { useState } from "react";

export default function Authenticate({token}) {
  const [successMessage, setSuccessMessage] = useState(null)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(null)

  async function handleClick(){
    try {
      const response = await fetch ('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: "GET",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
      const json = await response.json()
      console.log(json)
      
      if (json.data && json.data.username) {
        setUsername(json.data.username);
      }

      setSuccessMessage(json.message);
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }
  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {username && <p>Username: {username}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  )
}