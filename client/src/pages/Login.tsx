import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import '../styles/login.scss'

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {login,error,loading} = useLogin()

  const handleClick = (e:any):void => {
    e.preventDefault()
    login(email,password)
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <p>hey, did you miss us</p>
      <form>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleClick}>login</button>
        {
          loading ? <p>signing you up</p> : ''
        }
        {
          error ? <p>{error}</p> : ''
        }
      </form>
    </div>
  )
}

export default Login