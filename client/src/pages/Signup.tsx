import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import '../styles/signup.scss'
import Loader from "../components/app/Loader"

import { Helmet, HelmetProvider } from 'react-helmet-async'

const Signup = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {signup,loading,error} = useSignup()

  const handleClick = (e:any):void => {
    e.preventDefault()
    signup(email,password)
  }

  return (
    <HelmetProvider>
              {
          loading ? <Loader/> : null
        }
    <Helmet>
        <title>signup | file-hosting</title>
      </Helmet>
    <div className="signup">
      <h1>Signup</h1>
      <p>Join millions using file hosting</p>
      <form>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleClick}>signup</button>
        {
          error ? <p>{error}</p> : ''
        }
      </form>
    </div>
    </HelmetProvider>
  )
}

export default Signup