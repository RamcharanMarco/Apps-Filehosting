import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const useRenameBucket = () =>{

    const navigate = useNavigate()

    const {bucketid} = useParams()

    const {user} = useStore()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const renameBucket = async(rename:string) =>{
        console.log('rename',rename)
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:5000/api/buckets/edit/${bucketid}`, {
            method : 'POST',
            headers: {
                'Authorization' : `Bearer ${user.token}`,
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({name:rename})
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
            console.log('error')
        }
        if(response.ok){
            console.log('newbucket',json)
            setLoading(false)
            window.location.reload()
        }
    }

    return {renameBucket, loading, error}
}