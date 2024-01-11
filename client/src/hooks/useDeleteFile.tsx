import {useState} from 'react'
import { useStore } from '../store/store'
import {useNavigate} from 'react-router-dom'

export const useDeleteFile = () =>{

    const navigate = useNavigate()

    const {user} = useStore()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const deleteFile = async(id:string) =>{
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:5000/api/file/${id}`, {
            method : 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
              }
        })

        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            console.log(json)
            setLoading(false)
            window.location.reload()
        }
    }

    return {deleteFile, loading, error}
}