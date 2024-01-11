import '../styles/home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div>
      <h1>file-hosting</h1>
        <p>hosting your files has never been easier</p>
        <Link to='/signup'>get started</Link>
      </div>
    </div>
  )
}

export default Home