import {useEffect, useState,FC} from 'react'
import { useStore } from '../../store/store';
import { Link,useParams,useNavigate } from 'react-router-dom';
import '../../styles/createBucket.scss'

interface AppProps {
    toggle: (params: any) => any;
}

const CreateBucket: FC<AppProps> = ({ toggle }) => {


  const [name, setName] = useState<any>('')
  const {user} = useStore();
  const {id} = useParams();
  const [loading, setLoading] = useState<any>(false)
  const [error, setError] = useState<any>(false)

  const navigate = useNavigate();
  
  const handleClick = async (e:any) =>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    const response = await fetch(`http://localhost:5000/api/buckets/${id}`, {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${user.token}`
        },
        body: JSON.stringify({name})
    })

    const json = await response.json()

    if(!response.ok){
        setLoading(false)
        setError(json.error)
    }
    if(response.ok){
        console.log(json)
        navigate(`/console/${id}/buckets/${json._id}`)
    }
}

    return (
      <div className="createBucket">
      <button onClick={toggle} id="close-create">X</button>
        <div className="create">
            <h1>create a bucket</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="bucket name"/>
            <button onClick={handleClick}>create a bucket</button>
        </div>
    </div>
    );
};

export default CreateBucket;