import '../styles/linkbio.scss'
import {useState} from 'react'
const LinkBio = () => {

    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(false)

    const toggle = (e:any) =>{
        e.preventDefault()
        setEdit(!edit)
    }

  return (
    <div className="linkbio">
        <h1>my linkbio</h1>
        <div className="linkbionav">
            <button onClick={toggle}>edit</button>
            <button>cancel</button>
            <button onClick={toggle}>save</button>
            <button onClick={toggle}>view</button>
        </div>
    </div>
    )
}

export default LinkBio