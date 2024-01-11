import {Link} from 'react-router-dom'
import '../../styles/mainNavbar.scss'

const MainNavbar = () => {
  return (
    <nav className="mainNavbar">
        <h1>file-hosting</h1>
        <div className="links">
            <Link to='/login'>login</Link>
            <Link to='/signup'>sigunup</Link>
            <Link to='/docs'>docs</Link>
        </div>
    </nav>
  )
}

export default MainNavbar