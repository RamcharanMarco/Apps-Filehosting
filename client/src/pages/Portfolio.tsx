import '../styles/portfolio.scss'
import {useState} from 'react'
const Portfolio = () => {

    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(false)

    const toggle = (e:any) =>{
        e.preventDefault()
        setEdit(!edit)
    }

  return (
    <div className="portfolio">
        <h1>my portfolio</h1>
        <div className="portfolionav">
            <button onClick={toggle}>edit</button>
            <button>cancel</button>
            <button onClick={toggle}>save</button>
            <button onClick={toggle}>view</button>
        </div>
    </div>
    )
}

export default Portfolio