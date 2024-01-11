import {useState} from 'react'
import { useStore } from '../store/store'

export const useDeleteAllFiles = () =>{

    const {user} = useStore()

    const [error, setError] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const deleteAllFiles = async(bucketid:any) =>{
        setLoading(true)
        setError(null)
        const response = await fetch(`http://localhost:5000/api/file/bucket/${bucketid}`, {
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

    return {deleteAllFiles, loading, error}
}