import {useState} from 'react'

export default function SignUpForm ({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8) {
      setError("Username must be at least 8 characters long.");
      return;
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch ('https://fsa-jwt-practice.herokuapp.com/signup', {
        method:'POST',
        headers: {
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          username,
          password,
        })
      })
      const json = await response.json()
      console.log(json)
      setToken(json.token);
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  return (
    <>
    <h2>Sign Up</h2>
    {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: 
          <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>
          Password: 
          <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button>Submit</button>
      </form>
    </>
  )
  
}

